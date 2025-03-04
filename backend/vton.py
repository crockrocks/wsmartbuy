import torch
from PIL import Image
from diffusers import AutoPipelineForInpainting, StableDiffusionXLInpaintPipeline, AutoencoderKL
from diffusers.utils import load_image
import numpy as np
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class VirtualTryOn:
    def __init__(self, model_id="diffusers/stable-diffusion-xl-1.0-inpainting-0.1", device="cuda", use_ip_adapter=True):
        self.device = device if torch.cuda.is_available() and device == "cuda" else "cpu"
        logger.info(f"Using device: {self.device}")
        
        # Set consistent dtype for all models
        self.dtype = torch.float16 if self.device == "cuda" else torch.float32
        
        self.vae = AutoencoderKL.from_pretrained(
            "madebyollin/sdxl-vae-fp16-fix", 
            torch_dtype=self.dtype
        ).to(self.device)  # Explicitly move to device
        
        self.pipeline = AutoPipelineForInpainting.from_pretrained(
            model_id,
            vae=self.vae,
            torch_dtype=self.dtype,
            variant="fp16" if self.device == "cuda" else None,
            use_safetensors=True
        ).to(self.device)
        
        # Model CPU offload might be causing the issue - disable it if using CUDA
        if self.device == "cuda":
            # Don't use CPU offload for CUDA as it can cause tensor device mismatches
            # self.pipeline.enable_model_cpu_offload()  # Comment out this line
            self.pipeline.enable_xformers_memory_efficient_attention()
        else:
            self.pipeline.enable_model_cpu_offload()
        
        if use_ip_adapter:
            logger.info("Loading IP-Adapter...")
            self.pipeline.load_ip_adapter(
                "h94/IP-Adapter", 
                subfolder="sdxl_models", 
                weight_name="ip-adapter_sdxl.bin", 
                low_cpu_mem_usage=True
            )
            # Ensure adapter is on same device
            if hasattr(self.pipeline, "image_encoder"):
                self.pipeline.image_encoder = self.pipeline.image_encoder.to(self.device)
            self.use_ip_adapter = True
        else:
            self.use_ip_adapter = False
            
        try:
            from SegBody import segment_body
            self.segment_body = segment_body
            logger.info("Body segmentation module loaded successfully")
        except ImportError:
            logger.error("Failed to import SegBody. Please ensure it's installed correctly.")
            raise ImportError("SegBody module not found. Make sure to install it first.")
    
    def preprocess_images(self, image_path, clothing_path=None, target_size=(1024, 1024)):
        logger.info("Loading and preprocessing images...")
        
        if isinstance(image_path, str):
            try:
                image = load_image(image_path).convert("RGB")
            except Exception as e:
                logger.error(f"Error loading image: {e}")
                raise
        else:
            image = image_path.convert("RGB")
            
        original_width, original_height = image.size
        aspect_ratio = original_width / original_height
        
        if aspect_ratio > 1:
            new_width = target_size[0]
            new_height = int(new_width / aspect_ratio)
        else:
            new_height = target_size[1]
            new_width = int(new_height * aspect_ratio)
            
        image = image.resize((new_width, new_height), Image.LANCZOS)
        
        padded_image = Image.new("RGB", target_size, (255, 255, 255))
        paste_x = (target_size[0] - new_width) // 2
        paste_y = (target_size[1] - new_height) // 2
        padded_image.paste(image, (paste_x, paste_y))
        
        if clothing_path is not None:
            if isinstance(clothing_path, str):
                try:
                    clothing = load_image(clothing_path).convert("RGB")
                except Exception as e:
                    logger.error(f"Error loading clothing image: {e}")
                    raise
            else:
                clothing = clothing_path.convert("RGB")
                
            clothing_width, clothing_height = clothing.size
            clothing_aspect_ratio = clothing_width / clothing_height
            
            if clothing_aspect_ratio > 1:
                new_width = target_size[0]
                new_height = int(new_width / clothing_aspect_ratio)
            else:
                new_height = target_size[1]
                new_width = int(new_height * clothing_aspect_ratio)
                
            clothing = clothing.resize((new_width, new_height), Image.LANCZOS)
            
            padded_clothing = Image.new("RGB", target_size, (255, 255, 255))
            paste_x = (target_size[0] - new_width) // 2
            paste_y = (target_size[1] - new_height) // 2
            padded_clothing.paste(clothing, (paste_x, paste_y))
            
            return padded_image, padded_clothing
        
        return padded_image, None
    
    def generate_mask(self, image, include_face=False):
        logger.info(f"Generating body mask (include_face={include_face})...")
        try:
            seg_image, mask_image = self.segment_body(image, face=include_face)
            
            if mask_image is None or np.sum(np.array(mask_image)) == 0:
                logger.warning("Segmentation produced an empty mask, using fallback mask")
                mask_image = self._create_fallback_mask(image)
                
            return seg_image, mask_image
        except Exception as e:
            logger.error(f"Error in body segmentation: {e}")
            logger.info("Using fallback mask instead")
            return image, self._create_fallback_mask(image)
    
    def _create_fallback_mask(self, image, padding_percent=0.1):
        width, height = image.size
        mask = Image.new("RGB", (width, height), (0, 0, 0))
        
        pad_x = int(width * padding_percent)
        pad_y = int(height * padding_percent)
        
        draw_area = (
            pad_x,
            int(height * 0.2),
            width - pad_x,
            int(height * 0.9)
        )
        
        from PIL import ImageDraw
        draw = ImageDraw.Draw(mask)
        draw.rectangle(draw_area, fill=(255, 255, 255))
        
        return mask
    
    def virtual_try_on(
        self,
        image_path,
        clothing_path,
        prompt="photorealistic, perfect fit, high quality clothing, detailed fabric texture, professional fashion photography",
        negative_prompt="ugly, bad quality, bad anatomy, deformed body, deformed hands, deformed feet, deformed face, bad skin, unrealistic clothing, floating clothing, mismatch between body and clothing, pixelated, blurry, watermark",
        ip_scale=1.0,
        strength=0.95,
        guidance_scale=7.5,
        steps=50,
        include_face=False,
        seed=None,
        output_path=None,
        show_mask=False
    ):
        if seed is not None:
            generator = torch.Generator(device=self.device).manual_seed(seed)
        else:
            generator = None
            
        image, clothing = self.preprocess_images(image_path, clothing_path)
        
        _, mask_image = self.generate_mask(image, include_face=include_face)
        
        if self.use_ip_adapter:
            self.pipeline.set_ip_adapter_scale(ip_scale)
            
        enhanced_prompt = f"{prompt}, {self._analyze_clothing(clothing)}"
        logger.info(f"Using enhanced prompt: {enhanced_prompt}")
        
        pipeline_kwargs = {
            "prompt": enhanced_prompt,
            "negative_prompt": negative_prompt,
            "image": image,
            "mask_image": mask_image,
            "strength": strength,
            "guidance_scale": guidance_scale,
            "num_inference_steps": steps,
            "generator": generator
        }
        
        if self.use_ip_adapter and clothing is not None:
            pipeline_kwargs["ip_adapter_image"] = clothing
            
        logger.info(f"Running inpainting with {steps} steps...")
        with torch.inference_mode():
            # Make sure all pipeline components are on the same device
            self._verify_pipeline_device()
            output = self.pipeline(**pipeline_kwargs).images[0]
        
        if output_path:
            output_path = Path(output_path)
            output_path.parent.mkdir(parents=True, exist_ok=True)
            output.save(output_path)
            logger.info(f"Saved result to {output_path}")
        
        if show_mask:
            return output, mask_image
        return output
    
    def _verify_pipeline_device(self):
        """Verify all pipeline components are on the same device."""
        # Check key components to ensure they're on the same device
        if hasattr(self.pipeline, "unet"):
            self.pipeline.unet = self.pipeline.unet.to(self.device)
        if hasattr(self.pipeline, "vae"):
            self.pipeline.vae = self.pipeline.vae.to(self.device)
        if hasattr(self.pipeline, "text_encoder"):
            self.pipeline.text_encoder = self.pipeline.text_encoder.to(self.device)
        if hasattr(self.pipeline, "text_encoder_2"):
            self.pipeline.text_encoder_2 = self.pipeline.text_encoder_2.to(self.device)
    
    def _analyze_clothing(self, clothing_image):
        return "well-fitted clothing, natural draping, fabric details visible"


# Alternative implementation with less memory usage
def run_virtual_tryon_low_memory():
    # Define image paths using the URLs provided
    model_image_url = 'https://cdn-uploads.huggingface.co/production/uploads/648a824a8ca6cf9857d1349c/jpFBKqYB3BtAW26jCGJKL.jpeg'
    clothing_image_url = 'https://cdn-uploads.huggingface.co/production/uploads/648a824a8ca6cf9857d1349c/NL6mAYJTuylw373ae3g-Z.jpeg'
    
    # Using a no_ip_adapter option if memory is limited
    try_on = VirtualTryOn(
        model_id="diffusers/stable-diffusion-xl-1.0-inpainting-0.1",
        use_ip_adapter=False  # Disable IP-Adapter to reduce memory usage
    )
    
    result = try_on.virtual_try_on(
        image_path=model_image_url,
        clothing_path=clothing_image_url,
        prompt="photorealistic, perfect fit, high quality clothing, person wearing the exact clothing from reference image",
        negative_prompt="ugly, bad quality, bad anatomy, deformed clothing",
        steps=30,  # Reduced steps
        strength=0.85,  # Slightly reduced strength
        output_path="result.png"
    )
    
    return result

# Install SegBody package if it doesn't exist (simplified implementation)
def install_dependencies():
    try:
        import SegBody
    except ImportError:
        import os
        import sys
        logger.info("Installing SegBody dependency...")
        os.system("pip install git+https://github.com/facebookresearch/segment-body.git")
        # Reload sys modules to make the installation available
        import importlib
        importlib.invalidate_caches()

if __name__ == "__main__":
    # Install dependencies
    install_dependencies()
    
    # Load images using the provided URLs
    image = load_image('https://cdn-uploads.huggingface.co/production/uploads/648a824a8ca6cf9857d1349c/jpFBKqYB3BtAW26jCGJKL.jpeg').convert("RGB")
    ip_image = load_image('https://cdn-uploads.huggingface.co/production/uploads/648a824a8ca6cf9857d1349c/NL6mAYJTuylw373ae3g-Z.jpeg').convert("RGB")
    
    # Check CUDA memory
    if torch.cuda.is_available():
        free_memory = torch.cuda.get_device_properties(0).total_memory - torch.cuda.memory_allocated(0)
        logger.info(f"Free CUDA memory: {free_memory / 1e9:.2f} GB")
        
        # Choose approach based on available memory
        if free_memory < 8e9:  # Less than 8GB available
            logger.info("Running low memory version due to limited CUDA memory")
            result = run_virtual_tryon_low_memory()
        else:
            logger.info("Running standard version")
            try_on = VirtualTryOn(model_id="diffusers/stable-diffusion-xl-1.0-inpainting-0.1")
            result = try_on.virtual_try_on(
                image_path=image,
                clothing_path=ip_image,
                prompt="photorealistic, perfect fit, high quality clothing",
                negative_prompt="ugly, bad quality, bad anatomy, deformed clothing",
                steps=50,
                output_path="result.png"
            )
    else:
        logger.info("CUDA not available, running on CPU (this will be slow)")
        try_on = VirtualTryOn(model_id="diffusers/stable-diffusion-xl-1.0-inpainting-0.1", device="cpu")
        result = try_on.virtual_try_on(
            image_path=image,
            clothing_path=ip_image,
            prompt="photorealistic, perfect fit, high quality clothing",
            negative_prompt="ugly, bad quality, bad anatomy, deformed clothing",
            steps=25,  # Reduced steps for CPU
            output_path="result.png"
        )
    
    # Display result
    result.show()