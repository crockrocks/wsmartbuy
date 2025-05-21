import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, className = '' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  }, []);

  const processFile = (file: File) => {
    // Check if the file is an image
    if (!file.type.match('image.*')) {
      alert('Please upload an image file');
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Pass the file to the parent component
    onImageUpload(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleResetClick = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`${className}`}>
      <motion.div
        className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
          isDragging ? 'shadow-[0_0_20px_rgba(255,60,172,0.7)]' : 'shadow-[0_0_5px_rgba(120,75,160,0.3)]'
        } ${
          previewUrl ? 'border-wsmartbuy-primary' : 'border-wsmartbuy-secondary/30'
        } border-2 border-dashed bg-wsmartbuy-dark/30 backdrop-blur-sm`}
        animate={{
          borderColor: isDragging 
            ? ['rgba(255, 60, 172, 0.8)', 'rgba(43, 134, 197, 0.8)', 'rgba(255, 60, 172, 0.8)'] 
            : 'rgba(120, 75, 160, 0.3)'
        }}
        transition={{
          duration: 2,
          repeat: isDragging ? Infinity : 0,
          ease: "linear"
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        
        <div className="p-6 flex flex-col items-center justify-center min-h-[200px]">
          {previewUrl ? (
            <div className="relative w-full">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-h-[200px] mx-auto object-contain rounded"
              />
              <motion.button
                className="absolute top-2 right-2 bg-wsmartbuy-dark/60 text-wsmartbuy-text p-1 rounded-full"
                onClick={handleResetClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-wsmartbuy-secondary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-wsmartbuy-text mb-2">Drag & drop an image here</p>
              <p className="text-wsmartbuy-text-muted text-sm mb-4">or</p>
              <motion.button
                className="px-4 py-2 bg-gradient-to-r from-wsmartbuy-primary to-wsmartbuy-highlight text-wsmartbuy-text rounded-full font-medium"
                onClick={handleButtonClick}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 15px rgba(255, 60, 172, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Browse images
              </motion.button>
            </>
          )}
        </div>
      </motion.div>
      
      {previewUrl && (
        <motion.div 
          className="mt-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            className="px-4 py-2 bg-gradient-to-r from-wsmartbuy-secondary to-wsmartbuy-highlight text-wsmartbuy-text rounded-full font-medium"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 15px rgba(120, 75, 160, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            Analyze Image
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default ImageUpload; 