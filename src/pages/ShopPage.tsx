import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ClothingCard, { ClothingItem } from '../components/ClothingCard';
import ChatbotInterface from '../components/ChatbotInterface';

const ShopPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchClothingItems();
  }, [selectedCategory, page]);

  const fetchClothingItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:5000/api/clothing?category=${selectedCategory}&page=${page}`);
      const data = await response.json();
      
      if (data.success) {
        setClothingItems(data.items);
        setHasMore(data.has_more);
      } else {
        setError(data.message || 'Failed to fetch clothing items');
      }
    } catch (err) {
      setError('Error connecting to the server');
      console.error('Error fetching clothing items:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? clothingItems 
    : clothingItems.filter(item => item.category === selectedCategory);

  // Get unique categories excluding 'all'
  const categories = ['all', ...new Set(clothingItems.map(item => item.category).filter(cat => cat !== 'all'))];

  const handleTryNow = (item: ClothingItem) => {
    setSelectedItem(item);
    console.log('Trying item:', item);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-wsmartbuy-primary via-wsmartbuy-secondary to-wsmartbuy-highlight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover Our Collection
          </motion.h1>
          <motion.p 
            className="text-lg text-wsmartbuy-text-muted max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our real-time curated clothing selection from top brands
          </motion.p>
        </div>

        {/* Category Filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-wsmartbuy-primary to-wsmartbuy-highlight text-wsmartbuy-text shadow-glow'
                  : 'bg-wsmartbuy-dark/50 border border-wsmartbuy-secondary/30 text-wsmartbuy-text-muted hover:border-wsmartbuy-primary/50'
              }`}
              onClick={() => {
                setSelectedCategory(category);
                setPage(1);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wsmartbuy-primary mx-auto"></div>
            <p className="mt-4 text-wsmartbuy-text-muted">Loading items...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-xl font-semibold text-wsmartbuy-text mb-2">Error Loading Items</h3>
            <p className="text-wsmartbuy-text-muted">{error}</p>
          </div>
        )}

        {/* Clothing Items Grid */}
        {!loading && !error && (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredItems.map((item) => (
              <ClothingCard 
                key={item.id} 
                item={item} 
                onTryNow={handleTryNow} 
              />
            ))}
          </motion.div>
        )}

        {/* Pagination Controls */}
        {!loading && !error && filteredItems.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setPage(prev => Math.max(1, prev - 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                page === 1
                  ? 'bg-wsmartbuy-dark/50 text-wsmartbuy-text-muted cursor-not-allowed'
                  : 'bg-gradient-to-r from-wsmartbuy-primary to-wsmartbuy-highlight text-wsmartbuy-text hover:shadow-glow'
              }`}
            >
              Previous
            </button>
            <span className="text-wsmartbuy-text">Page {page}</span>
            <button
              onClick={() => setPage(prev => prev + 1)}
              disabled={!hasMore}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                !hasMore
                  ? 'bg-wsmartbuy-dark/50 text-wsmartbuy-text-muted cursor-not-allowed'
                  : 'bg-gradient-to-r from-wsmartbuy-primary to-wsmartbuy-highlight text-wsmartbuy-text hover:shadow-glow'
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredItems.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-wsmartbuy-secondary/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 16h.01M12 12h.01M12 8h.01M18 12h.01M6 12h.01M12 2v2m0 16v2m10-10h-2m-16 0h2" />
            </svg>
            <h3 className="text-xl font-semibold text-wsmartbuy-text mb-2">No items found</h3>
            <p className="text-wsmartbuy-text-muted">Try selecting a different category or search term</p>
          </motion.div>
        )}
      </div>

      {/* Chatbot Interface */}
      <ChatbotInterface />

      {/* Decorative elements */}
      <div className="fixed -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-r from-wsmartbuy-primary to-wsmartbuy-secondary opacity-20 blur-3xl pointer-events-none"></div>
      <div className="fixed -bottom-32 -left-20 w-80 h-80 rounded-full bg-gradient-to-r from-wsmartbuy-secondary to-wsmartbuy-highlight opacity-20 blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default ShopPage; 