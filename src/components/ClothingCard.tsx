import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface ClothingItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  source: string;
  link: string;
}

interface ClothingCardProps {
  item: ClothingItem;
  onTryNow: (item: ClothingItem) => void;
}

const ClothingCard: React.FC<ClothingCardProps> = ({ item, onTryNow }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      className="rounded-xl overflow-hidden bg-wsmartbuy-bg border border-wsmartbuy-secondary/30 relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        boxShadow: '0 0 20px rgba(120, 75, 160, 0.3)',
        borderColor: 'rgba(255, 60, 172, 0.5)',
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowOptions(false);
      }}
    >
      {/* Image Container with Zoom Effect */}
      <div className="overflow-hidden aspect-w-3 aspect-h-4 relative">
        <img
          src={imageError ? '/placeholder-clothing.jpg' : item.image}
          alt={item.name}
          className="object-cover w-full h-full transform transition-transform duration-700 ease-in-out"
          style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
          onError={handleImageError}
        />
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-wsmartbuy-dark/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 text-wsmartbuy-text">{item.name}</h3>
        <div className="flex justify-between items-center mb-2">
          <p className="text-wsmartbuy-text-muted text-sm">{item.category}</p>
          <p className="text-wsmartbuy-text-muted text-sm">{item.source}</p>
        </div>
        
        {/* Price and Actions Row */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-wsmartbuy-primary font-bold">₹{item.price.toFixed(2)}</span>
          
          <div className="flex space-x-2">
            {/* Add to Cart Button */}
            <motion.button
              className="w-9 h-9 rounded-full flex items-center justify-center border border-wsmartbuy-secondary/50 text-wsmartbuy-text transition-all duration-300 bg-wsmartbuy-bg/80"
              whileHover={{ 
                borderColor: 'rgba(255, 60, 172, 0.8)',
                boxShadow: '0 0 10px rgba(255, 60, 172, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </motion.button>
            
            {/* Options Button */}
            <motion.button
              className="w-9 h-9 rounded-full flex items-center justify-center border border-wsmartbuy-secondary/50 text-wsmartbuy-text transition-all duration-300 bg-wsmartbuy-bg/80 relative"
              whileHover={{ 
                borderColor: 'rgba(43, 134, 197, 0.8)',
                boxShadow: '0 0 10px rgba(43, 134, 197, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowOptions(!showOptions)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
              
              {/* Services Popup Menu */}
              {showOptions && (
                <motion.div 
                  className="absolute right-0 top-full mt-2 w-48 bg-wsmartbuy-bg rounded-lg shadow-lg z-10 border border-wsmartbuy-secondary/30"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-wsmartbuy-secondary/10 cursor-pointer text-wsmartbuy-text">Save for Later</li>
                    <li className="px-4 py-2 hover:bg-wsmartbuy-secondary/10 cursor-pointer text-wsmartbuy-text">Add to Wishlist</li>
                    <li className="px-4 py-2 hover:bg-wsmartbuy-secondary/10 cursor-pointer text-wsmartbuy-text">Share Item</li>
                    <li className="px-4 py-2 hover:bg-wsmartbuy-secondary/10 cursor-pointer text-wsmartbuy-text">
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                        View on {item.source}
                      </a>
                    </li>
                  </ul>
                </motion.div>
              )}
            </motion.button>
          </div>
        </div>
        
        {/* Buttons Row */}
        <div className="flex space-x-2">
          {/* Try Now Button */}
          <motion.button
            className="flex-1 py-2.5 bg-gradient-to-r from-wsmartbuy-primary to-wsmartbuy-highlight text-wsmartbuy-text font-medium rounded-lg"
            onClick={() => onTryNow(item)}
            whileHover={{ 
              boxShadow: '0 0 15px rgba(255, 60, 172, 0.5)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            Try Now
          </motion.button>

          {/* Visit Button */}
          <motion.a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 bg-gradient-to-r from-wsmartbuy-secondary to-wsmartbuy-accent text-wsmartbuy-text font-medium rounded-lg text-center"
            whileHover={{ 
              boxShadow: '0 0 15px rgba(43, 134, 197, 0.5)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            Visit
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ClothingCard; 