// PurchaseHistory.tsx
import React, { useState } from 'react';
import { Clock, Search, Plus, Trash2, PlusCircle } from 'lucide-react';
import { PurchaseHistoryItem, StoreItem } from './types';

interface PurchaseHistoryProps {
  onAddToList: (item: StoreItem) => void;
}

const PurchaseHistory: React.FC<PurchaseHistoryProps> = ({ onAddToList }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newItem, setNewItem] = useState<string>('');
  const [history, setHistory] = useState<PurchaseHistoryItem[]>([
    {
      id: 1,
      item: 'Milk',
      date: '2025-01-08',
      price: 4.99,
      brand: 'Organic Valley'
    },
    {
      id: 2,
      item: 'Bread',
      date: '2025-01-07',
      price: 3.49,
      brand: 'Dave\'s Killer Bread'
    }
  ]);

  const addItem = (): void => {
    if (newItem.trim()) {
      const newHistoryItem: PurchaseHistoryItem = {
        id: Date.now(),
        item: newItem,
        date: new Date().toISOString().split('T')[0],
        price: 0,
        brand: ''
      };
      setHistory(prev => [newHistoryItem, ...prev]);
      setNewItem('');
    }
  };

  const deleteItem = (id: number): void => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const addToShoppingList = (historyItem: PurchaseHistoryItem): void => {
    const storeItem: StoreItem = {
      id: historyItem.id.toString(),
      name: historyItem.item,
      brand: historyItem.brand,
      price: historyItem.price,
      category: '',
      unit: '',
      location: '',
      aisle: '',
      inStock: true,
      nutrition: {
        calories: 0,
        protein: '0g',
        fat: '0g',
        carbs: '0g'
      }
    };
    onAddToList(storeItem);
  };

  const filteredHistory = history.filter(item =>
    item.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Purchase History</h2>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search purchase history..."
              className="w-full pl-10 pr-3 py-2 border rounded-md"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add new item..."
              className="px-3 py-2 border rounded-md"
            />
            <button
              onClick={addItem}
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {filteredHistory.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            >
              <div>
                <h3 className="font-medium">{item.item}</h3>
                <p className="text-sm text-gray-600">
                  {item.brand} - ${item.price}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{item.date}</span>
                <button
                  onClick={() => addToShoppingList(item)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <PlusCircle className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;