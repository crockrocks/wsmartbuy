// UserPreferences.tsx
import React, { useState } from 'react';
import { Settings, Save } from 'lucide-react';
import { UserPreference } from './types';

interface UserPreferencesProps {
  onSave: (preferences: UserPreference) => void;
}

const UserPreferences: React.FC<UserPreferencesProps> = ({ onSave }) => {
  const [preferences, setPreferences] = useState<UserPreference>({
    dietaryRestrictions: [],
    preferredBrands: [],
    maxBudget: '',
    preferredStores: []
  });

  const dietaryOptions: string[] = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Nut-Free'
  ];
  
  const handlePreferenceChange = (field: keyof UserPreference, value: any): void => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Shopping Preferences</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dietary Restrictions
          </label>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map(option => (
              <button
                key={option}
                onClick={() => {
                  const updated = preferences.dietaryRestrictions.includes(option)
                    ? preferences.dietaryRestrictions.filter(item => item !== option)
                    : [...preferences.dietaryRestrictions, option];
                  handlePreferenceChange('dietaryRestrictions', updated);
                }}
                className={`px-3 py-1 rounded-full text-sm ${
                  preferences.dietaryRestrictions.includes(option)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maximum Budget
          </label>
          <input
            type="number"
            value={preferences.maxBudget}
            onChange={(e) => handlePreferenceChange('maxBudget', e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your maximum budget"
          />
        </div>

        <button
          onClick={() => onSave(preferences)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Save className="w-4 h-4" />
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default UserPreferences;