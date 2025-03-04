import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, PlusCircle } from 'lucide-react';
import UserPreferences from './userpreferences';
import PurchaseHistory from './purchasehistory';
import ProductSuggestions from './productsuggestion';
import ShoppingList from './shoppinglist';
import { mockStoreData } from './mockStoreData';
import { StoreItem, UserPreference, ShoppingListItem } from './types';

const ItemSuggestor: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<StoreItem[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [userPrefs, setUserPrefs] = useState<UserPreference>({
    dietaryRestrictions: [],
    preferredBrands: [],
    maxBudget: '',
    preferredStores: []
  });

  const handleSearch = (): void => {
    const results = mockStoreData.searchByTerm(searchTerm);
    setSearchResults(results);
  };

  const handlePreferencesSave = (prefs: UserPreference): void => {
    setUserPrefs(prefs);
  };

  const addToList = (item: StoreItem): void => {
    setShoppingList(currentList => {
      const existingItem = currentList.find(i => i.id === item.id);

      if (existingItem) {
        // Update quantity if item exists
        return currentList.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        // Add new item with quantity 1
        return [...currentList, { ...item, quantity: 1 }];
      }
    });
  };

  const handleUpdateList = (newList: ShoppingListItem[]): void => {
    setShoppingList(newList);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Smart Shopping Assistant
        </h1>
        <p className="text-lg text-gray-600">
          Your personalized shopping companion
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex gap-4 mb-8">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for items..."
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Search className="w-6 h-6" />
            </button>
          </div>

          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-6 mb-6"
            >
              <div className="space-y-4">
                {searchResults.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <p className="text-sm text-gray-600">{item.brand}</p>
                      <p className="text-xs text-gray-500">
                        {item.nutrition.calories} cal | {item.nutrition.protein} protein
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-green-600 font-medium">${item.price}</p>
                        <p className="text-gray-600">{item.location}</p>
                        <p className="text-sm text-gray-500">{item.aisle}</p>
                      </div>
                      <button
                        onClick={() => addToList(item)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <PlusCircle className="w-6 h-6" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          <ProductSuggestions
            userPreferences={userPrefs}
            purchaseHistory={[]}
            onAddToList={addToList}
          />
        </div>

        <div className="space-y-6">
          <UserPreferences onSave={handlePreferencesSave} />
          <ShoppingList
            items={shoppingList}
            onUpdateList={handleUpdateList}
          />
          <PurchaseHistory onAddToList={addToList} />
        </div>
      </div>
    </div>
  );
};

export default ItemSuggestor;