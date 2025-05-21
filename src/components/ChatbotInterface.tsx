import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatbotInterfaceProps {
  className?: string;
}

const ChatbotInterface: React.FC<ChatbotInterfaceProps> = ({ className = '' }) => {
  const [inputText, setInputText] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Preset suggestions
  const presets = [
    "What's trending now?",
    "Will this match with...?",
    "Find similar styles",
    "Best for my body type"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !previewUrl) return;
    
    // Just clear the input after sending
    setInputText('');
    if (previewUrl) {
      setPreviewUrl(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

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
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removePreview = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePresetClick = (preset: string) => {
    setInputText(preset);
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 ${className}`}>
      {/* Main chatbot navbar */}
      <div className="bg-wsmartbuy-dark/80 backdrop-blur-lg border-t border-wsmartbuy-secondary/30 shadow-glow-up py-3">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Preset suggestions */}
          <motion.div 
            className="flex flex-wrap gap-2 mb-3 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, staggerChildren: 0.1 }}
          >
            {presets.map((preset, index) => (
              <motion.button
                key={index}
                className="text-xs bg-wsmartbuy-dark/60 text-wsmartbuy-text-muted px-3 py-1 rounded-full border border-wsmartbuy-secondary/30 hover:border-wsmartbuy-primary/50 transition-colors"
                onClick={() => handlePresetClick(preset)}
                whileHover={{ scale: 1.05, borderColor: 'rgba(255, 60, 172, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 * index }}
              >
                {preset}
              </motion.button>
            ))}
          </motion.div>

          {/* Input form */}
          <form onSubmit={sendMessage} className="flex items-center gap-2">
            {/* Input field with integrated upload button */}
            <div className="flex-1 relative">
              <div className="flex items-center w-full bg-wsmartbuy-bg/50 text-wsmartbuy-text border border-wsmartbuy-secondary/30 rounded-full focus-within:border-wsmartbuy-primary overflow-hidden pr-2">
                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
                
                {/* Image upload button - inside input on the left */}
                <motion.button
                  type="button"
                  className="flex items-center justify-center h-9 px-3 text-wsmartbuy-text-muted hover:text-wsmartbuy-text transition-colors"
                  onClick={handleImageButtonClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </motion.button>
                
                <input
                  type="text"
                  value={inputText}
                  onChange={handleInputChange}
                  placeholder="Ask about styles or products..."
                  className="flex-1 bg-transparent py-2 px-2 focus:outline-none"
                />
              </div>
              
              {/* Preview section - now as a floating element above the input */}
              <AnimatePresence>
                {previewUrl && (
                  <motion.div 
                    className="absolute -top-16 left-0 bg-wsmartbuy-dark/90 border border-wsmartbuy-secondary/50 rounded-lg p-2 flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="h-12 w-12 object-cover rounded-md"
                    />
                    <motion.button
                      type="button"
                      className="text-wsmartbuy-text-muted hover:text-wsmartbuy-text"
                      onClick={removePreview}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Send button */}
            <motion.button
              type="submit"
              className="bg-gradient-to-r from-wsmartbuy-primary to-wsmartbuy-highlight text-white rounded-full p-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatbotInterface; 