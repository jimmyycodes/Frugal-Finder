import { mockItems } from '@/constants/MockVars';
import { singleItem } from '@/constants/Types';

// Define an extended item with display properties
interface EnhancedItem extends singleItem {
  backgroundColor: string;
  stores?: string;
}

// Add background color and stores property to each item
function enhanceItemForDisplay(item: singleItem): EnhancedItem {
  // Generate a pastel background color based on the item name
  const hash = item.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const backgroundColor = [
    '#F5FFE1', '#E8FFE1', '#E1EEFF', '#FFE1FF', '#FFF1E1',
    '#E1FFF1', '#FFE1E1', '#E1FFE4', '#FFFDE1', '#E1FFF5'
  ][hash % 10];

  return {
    ...item,
    backgroundColor,
    stores: item.store, // Use the store field as stores
  };
}

// Map product names to categories for demo purposes
const productCategories: Record<string, string> = {
  "Organic Bananas": "Fruits",
  "Fresh Strawberries": "Fruits",
  "Avocado": "Fruits",
  "Baby Spinach": "Vegetables",
  "Cucumber": "Vegetables",
  "Tomatoes": "Vegetables",
  "Almond Milk": "Beverages",
  "Greek Yogurt": "Dairy",
  "Cheddar Cheese": "Dairy",
  "Fresh Salmon Fillet": "Meat",
  "Organic Chicken Breast": "Meat",
  "Extra Virgin Olive Oil": "Cooking Oil",
  "Red Wine Vinegar": "Cooking Oil",
  "Peanut Butter": "Grocery",
  "Brown Rice": "Grocery",
  "Whole Wheat Pasta": "Grocery",
  "Dark Chocolate": "Grocery",
  "Whole Grain Bread": "Bakery"
};

export function searchItems(query: string): EnhancedItem[] {
  if (!query || query.trim() === '') {
    // Return a few featured items for empty search
    return mockItems.slice(0, 6).map(enhanceItemForDisplay);
  }

  const searchTerm = query.toLowerCase().trim();

  // Check if it's a category search
  if (['fruits', 'vegetables', 'beverages', 'dairy', 'meat', 'cooking oil', 'grocery', 'bakery', 'household'].includes(searchTerm)) {
    return mockItems
      .filter(item => {
        const category = productCategories[item.name];
        return category && category.toLowerCase() === searchTerm;
      })
      .map(enhanceItemForDisplay);
  }

  // Regular search by name or store
  return mockItems
    .filter(item =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.store.toLowerCase().includes(searchTerm)
    )
    .map(enhanceItemForDisplay);
}