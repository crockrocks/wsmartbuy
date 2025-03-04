export interface NutritionInfo {
    calories: number;
    protein: string;
    fat: string;
    carbs: string;
  }
  
  export interface StoreItem {
    id: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    unit: string;
    location: string;
    aisle: string;
    inStock: boolean;
    nutrition: NutritionInfo;
    seasonal?: boolean;
    alternatives?: string[];
  }
  
  export interface Deal {
    id: string;
    itemId: string;
    type: 'discount' | 'bogo';
    description: string;
    discountPercent: number;
    validUntil: string;
  }
  
  export interface ShoppingListItem extends StoreItem {
    quantity: number;
  }
  
  export interface UserPreference {
    dietaryRestrictions: string[];
    preferredBrands: string[];
    maxBudget: string;
    preferredStores: string[];
  }
  
  export interface PurchaseHistoryItem {
    id: number;
    item: string;
    date: string;
    price: number;
    brand: string;
  }