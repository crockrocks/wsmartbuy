// ProductSuggestions.tsx
import React from 'react';
import { Sparkles, Tag, PlusCircle } from 'lucide-react';
import { UserPreference, StoreItem } from './types';

interface ProductSuggestionsProps {
  userPreferences: UserPreference;
  purchaseHistory: StoreItem[];
  onAddToList: (item: StoreItem) => void;
}

interface SuggestionCategory {
  type: string;
  items: StoreItem[];
}

const ProductSuggestions: React.FC<ProductSuggestionsProps> = ({
  userPreferences,
  purchaseHistory,
  onAddToList
}) => {
  const suggestions: SuggestionCategory[] = [
    {
      type: 'seasonal',
      items: [
        {
          id: 'season1',
          name: 'Fresh Strawberries',
          price: 4.99,
          brand: 'Fresh Farm',
          category: 'Produce',
          unit: 'lb',
          location: 'Produce Section',
          aisle: 'A1',
          inStock: true,
          nutrition: {
            calories: 50,
            protein: '1g',
            fat: '0g',
            carbs: '11g'
          }
        },
      ]
    },
    {
      type: 'frequently-bought',
      items: [
        {
          id: 'freq1',
          name: 'Organic Eggs',
          price: 5.99,
          brand: 'Farm Fresh',
          category: 'Dairy',
          unit: 'dozen',
          location: 'Dairy Section',
          aisle: 'B2',
          inStock: true,
          nutrition: {
            calories: 70,
            protein: '6g',
            fat: '5g',
            carbs: '0g'
          }
        },
      ]
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Recommended for You</h2>
      </div>

      <div className="space-y-6">
        {suggestions.map((category, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-lg font-medium capitalize">
              {category.type.replace('-', ' ')} Items
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="text-sm text-gray-600 mt-1">
                        <p>Calories: {item.nutrition.calories}</p>
                        <p>Protein: {item.nutrition.protein}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-600">
                          ${item.price}
                        </span>
                      </div>
                      <button
                        onClick={() => onAddToList(item)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <PlusCircle className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSuggestions;