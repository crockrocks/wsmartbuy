import { StoreItem, Deal } from './types';

interface MockStoreData {
  categories: string[];
  items: StoreItem[];
  deals: Deal[];
  searchByTerm: (term: string) => StoreItem[];
  getItemById: (id: string) => StoreItem | undefined;
  getAlternatives: (itemId: string) => StoreItem[];
  getDeals: (itemId: string) => Deal[];
  getSeasonalItems: () => StoreItem[];
}

export const mockStoreData: MockStoreData = {
  categories: [
    'Produce',
    'Dairy',
    'Meat & Seafood',
    'Bakery',
    'Pantry',
    'Frozen Foods',
    'Beverages',
    'Snacks',
    'Household'
  ],
  
  items: [
    {
      id: '1001',
      name: 'Organic Bananas',
      brand: 'Fresh Farm',
      category: 'Produce',
      price: 2.99,
      unit: 'bunch',
      location: 'Produce Section',
      aisle: 'A1',
      inStock: true,
      nutrition: {
        calories: 105,
        protein: '1.3g',
        fat: '0.4g',
        carbs: '27g'
      },
      seasonal: true
    },
    {
      id: '1002',
      name: 'Whole Milk',
      brand: 'Dairy Fresh',
      category: 'Dairy',
      price: 3.49,
      unit: 'gallon',
      location: 'Dairy Section',
      aisle: 'B2',
      inStock: true,
      nutrition: {
        calories: 150,
        protein: '8g',
        fat: '8g',
        carbs: '12g'
      },
      seasonal: false
    },
    {
      id: '1003',
      name: 'Ground Beef 80/20',
      brand: 'Premium Meats',
      category: 'Meat & Seafood',
      price: 5.99,
      unit: 'lb',
      location: 'Meat Counter',
      aisle: 'C1',
      inStock: true,
      nutrition: {
        calories: 280,
        protein: '23g',
        fat: '20g',
        carbs: '0g'
      },
      seasonal: false
    },
    {
      id: '1004',
      name: 'Sourdough Bread',
      brand: 'Artisan Bakery',
      category: 'Bakery',
      price: 4.99,
      unit: 'loaf',
      location: 'Bakery Section',
      aisle: 'D1',
      inStock: true,
      nutrition: {
        calories: 120,
        protein: '4g',
        fat: '0.5g',
        carbs: '23g'
      },
      seasonal: false
    },
    {
      id: '1005',
      name: 'Organic Pasta Sauce',
      brand: 'Giovanni',
      category: 'Pantry',
      price: 5.49,
      unit: 'jar',
      location: 'Pasta Aisle',
      aisle: 'E3',
      inStock: true,
      nutrition: {
        calories: 70,
        protein: '2g',
        fat: '2g',
        carbs: '12g'
      },
      seasonal: false
    },
    {
      id: '1006',
      name: 'Premium Ice Cream',
      brand: 'Sweet Dreams',
      category: 'Frozen Foods',
      price: 6.99,
      unit: 'pint',
      location: 'Frozen Section',
      aisle: 'F2',
      inStock: true,
      nutrition: {
        calories: 280,
        protein: '4g',
        fat: '18g',
        carbs: '28g'
      },
      seasonal: true
    },
    {
      id: '1007',
      name: 'Organic Coffee Beans',
      brand: 'Mountain Brew',
      category: 'Beverages',
      price: 12.99,
      unit: 'lb',
      location: 'Coffee Aisle',
      aisle: 'G1',
      inStock: true,
      nutrition: {
        calories: 0,
        protein: '0g',
        fat: '0g',
        carbs: '0g'
      },
      seasonal: false
    },
    {
      id: '1008',
      name: 'Potato Chips',
      brand: 'Crunch Time',
      category: 'Snacks',
      price: 3.99,
      unit: 'bag',
      location: 'Snack Aisle',
      aisle: 'H2',
      inStock: true,
      nutrition: {
        calories: 150,
        protein: '2g',
        fat: '10g',
        carbs: '15g'
      },
      seasonal: false
    },
    {
      id: '1009',
      name: 'Paper Towels',
      brand: 'Clean Home',
      category: 'Household',
      price: 8.99,
      unit: 'pack',
      location: 'Household Section',
      aisle: 'I3',
      inStock: true,
      nutrition: {
        calories: 0,
        protein: '0g',
        fat: '0g',
        carbs: '0g'
      },
      seasonal: false
    },
    {
      id: '1010',
      name: 'Fresh Strawberries',
      brand: 'Berry Farms',
      category: 'Produce',
      price: 4.99,
      unit: 'lb',
      location: 'Produce Section',
      aisle: 'A2',
      inStock: true,
      nutrition: {
        calories: 50,
        protein: '1g',
        fat: '0.5g',
        carbs: '12g'
      },
      seasonal: true
    },
    {
      id: '1011',
      name: 'Greek Yogurt',
      brand: 'Dairy Fresh',
      category: 'Dairy',
      price: 1.29,
      unit: 'cup',
      location: 'Dairy Section',
      aisle: 'B3',
      inStock: true,
      nutrition: {
        calories: 120,
        protein: '12g',
        fat: '4g',
        carbs: '8g'
      },
      seasonal: false
    },
    {
      id: '1012',
      name: 'Atlantic Salmon',
      brand: 'Sea Best',
      category: 'Meat & Seafood',
      price: 12.99,
      unit: 'lb',
      location: 'Seafood Counter',
      aisle: 'C2',
      inStock: true,
      nutrition: {
        calories: 208,
        protein: '22g',
        fat: '13g',
        carbs: '0g'
      },
      seasonal: true
    },
    {
      id: '1013',
      name: 'Chocolate Chip Cookies',
      brand: 'Sweet Treats',
      category: 'Bakery',
      price: 3.99,
      unit: 'dozen',
      location: 'Bakery Section',
      aisle: 'D2',
      inStock: true,
      nutrition: {
        calories: 160,
        protein: '2g',
        fat: '8g',
        carbs: '21g'
      },
      seasonal: false
    },
    {
      id: '1014',
      name: 'Black Beans',
      brand: 'Pantry Basics',
      category: 'Pantry',
      price: 0.99,
      unit: 'can',
      location: 'Canned Goods',
      aisle: 'E2',
      inStock: true,
      nutrition: {
        calories: 120,
        protein: '7g',
        fat: '0.5g',
        carbs: '22g'
      },
      seasonal: false
    },
    {
      id: '1015',
      name: 'Frozen Pizza',
      brand: 'Quick Meals',
      category: 'Frozen Foods',
      price: 7.99,
      unit: 'each',
      location: 'Frozen Section',
      aisle: 'F3',
      inStock: true,
      nutrition: {
        calories: 300,
        protein: '14g',
        fat: '12g',
        carbs: '35g'
      },
      seasonal: false
    },
    {
      id: '1016',
      name: 'Orange Juice',
      brand: 'Fresh Squeeze',
      category: 'Beverages',
      price: 4.99,
      unit: 'gallon',
      location: 'Juice Aisle',
      aisle: 'G2',
      inStock: true,
      nutrition: {
        calories: 110,
        protein: '2g',
        fat: '0g',
        carbs: '26g'
      },
      seasonal: false
    },
    {
      id: '1017',
      name: 'Trail Mix',
      brand: 'Natures Best',
      category: 'Snacks',
      price: 5.99,
      unit: 'bag',
      location: 'Snack Aisle',
      aisle: 'H1',
      inStock: true,
      nutrition: {
        calories: 140,
        protein: '5g',
        fat: '8g',
        carbs: '16g'
      },
      seasonal: false
    },
    {
      id: '1018',
      name: 'Laundry Detergent',
      brand: 'Clean Home',
      category: 'Household',
      price: 14.99,
      unit: 'bottle',
      location: 'Household Section',
      aisle: 'I2',
      inStock: true,
      nutrition: {
        calories: 0,
        protein: '0g',
        fat: '0g',
        carbs: '0g'
      },
      seasonal: false
    },
    {
      id: '1019',
      name: 'Avocados',
      brand: 'Fresh Farm',
      category: 'Produce',
      price: 1.99,
      unit: 'each',
      location: 'Produce Section',
      aisle: 'A3',
      inStock: true,
      nutrition: {
        calories: 240,
        protein: '3g',
        fat: '22g',
        carbs: '12g'
      },
      seasonal: true
    },
    {
      id: '1020',
      name: 'Sharp Cheddar',
      brand: 'Dairy Fresh',
      category: 'Dairy',
      price: 4.99,
      unit: 'block',
      location: 'Dairy Section',
      aisle: 'B1',
      inStock: true,
      nutrition: {
        calories: 110,
        protein: '7g',
        fat: '9g',
        carbs: '0g'
      },
      seasonal: false
    },
    {
      id: '1021',
      name: 'Chicken Breast',
      brand: 'Premium Meats',
      category: 'Meat & Seafood',
      price: 6.99,
      unit: 'lb',
      location: 'Meat Counter',
      aisle: 'C3',
      inStock: true,
      nutrition: {
        calories: 165,
        protein: '31g',
        fat: '3.6g',
        carbs: '0g'
      },
      seasonal: false
    },
    {
      id: '1022',
      name: 'Bagels',
      brand: 'Artisan Bakery',
      category: 'Bakery',
      price: 4.49,
      unit: 'pack',
      location: 'Bakery Section',
      aisle: 'D3',
      inStock: true,
      nutrition: {
        calories: 270,
        protein: '9g',
        fat: '1.5g',
        carbs: '53g'
      },
      seasonal: false
    },
    {
      id: '1023',
      name: 'Quinoa',
      brand: 'Pantry Basics',
      category: 'Pantry',
      price: 5.99,
      unit: 'box',
      location: 'Grain Aisle',
      aisle: 'E1',
      inStock: true,
      nutrition: {
        calories: 120,
        protein: '4g',
        fat: '2g',
        carbs: '21g'
      },
      seasonal: false
    },
    {
      id: '1024',
      name: 'Frozen Vegetables',
      brand: 'Garden Fresh',
      category: 'Frozen Foods',
      price: 2.99,
      unit: 'bag',
      location: 'Frozen Section',
      aisle: 'F1',
      inStock: true,
      nutrition: {
        calories: 70,
        protein: '4g',
        fat: '0g',
        carbs: '14g'
      },
      seasonal: false
    },
    {
      id: '1025',
      name: 'Sparkling Water',
      brand: 'Bubble Pop',
      category: 'Beverages',
      price: 3.99,
      unit: 'pack',
      location: 'Beverage Aisle',
      aisle: 'G3',
      inStock: true,
      nutrition: {
        calories: 0,
        protein: '0g',
        fat: '0g',
        carbs: '0g'
      },
      seasonal: false
    }
  ],

  deals: [
    {
      id: 'deal1',
      itemId: '1001',
      type: 'discount',
      description: '20% off Organic Bananas',
      discountPercent: 20,
      validUntil: '2025-02-01'
    },
    {
      id: 'deal2',
      itemId: '1003',
      type: 'discount',
      description: 'Ground Beef $1 off per pound',
      discountPercent: 15,
      validUntil: '2025-01-20'
    },
    {
      id: 'deal3',
      itemId: '1006',
      type: 'discount',
      description: 'Buy One Get One 50% Off Ice Cream',
      discountPercent: 50,
      validUntil: '2025-01-15'
    },
    {
      id: 'deal4',
      itemId: '1012',
      type: 'discount',
      description: 'Fresh Salmon $3 off per pound',
      discountPercent: 25,
      validUntil: '2025-01-12'
    },
    {
      id: 'deal5',
      itemId: '1019',
      type: 'discount',
      description: 'Avocados 2 for $3',
      discountPercent: 30,
      validUntil: '2025-01-18'
    }
  ],

  searchByTerm: (term: string): StoreItem[] => {
    const lowercaseTerm = term.toLowerCase();
    return mockStoreData.items.filter(item =>
      item.name.toLowerCase().includes(lowercaseTerm) ||
      item.brand.toLowerCase().includes(lowercaseTerm) ||
      item.category.toLowerCase().includes(lowercaseTerm)
    );
  },

  getItemById: (id: string): StoreItem | undefined => {
    return mockStoreData.items.find(item => item.id === id);
  },

  getAlternatives: (itemId: string): StoreItem[] => {
    const item = mockStoreData.getItemById(itemId);
    if (item?.alternatives) {
      return item.alternatives
        .map(id => mockStoreData.getItemById(id))
        .filter((item): item is StoreItem => item !== undefined);
    }
    return [];
  },

  getDeals: (itemId: string): Deal[] => {
    return mockStoreData.deals.filter(deal => deal.itemId === itemId);
  },

  getSeasonalItems: (): StoreItem[] => {
    return mockStoreData.items.filter(item => item.seasonal);
  }
};