import React from 'react';
import { List, Plus, Minus, Trash2, DollarSign } from 'lucide-react';
import { ShoppingListItem } from './types';

interface ShoppingListProps {
  items: ShoppingListItem[];
  onUpdateList: (items: ShoppingListItem[]) => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ items, onUpdateList }) => {
  const removeItem = (itemId: string): void => {
    const newList = items.filter(item => item.id !== itemId);
    onUpdateList(newList);
  };

  const updateQuantity = (itemId: string, delta: number): void => {
    const newList = items.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    onUpdateList(newList);
  };

  const calculateTotal = (): number => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <List className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Shopping List</h2>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-600" />
          <span className="font-semibold text-lg">
            ${calculateTotal().toFixed(2)}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-600">
                ${item.price} | {item.brand}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        
        {items.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            Your shopping list is empty
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;