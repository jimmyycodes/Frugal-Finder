import { mockItems } from '@/constants/MockVars';
import { singleItem } from '@/constants/Types';

// Define an extended item with display properties
interface EnhancedItem extends singleItem {
  backgroundColor?: string;
  stores?: string;
}

/**
 * Search for items based on a search term
 * Returns items with enhanced display properties like multiple stores
 */
export async function searchItems(searchTerm: string): Promise<EnhancedItem[]> {
  if (!searchTerm) return [];

  const searchTermLower = searchTerm.toLowerCase();

  try {
    // Call the search API
    const items = await searchProducts(searchTerm);

    // turn into singleItem
    const singleItems: singleItem[] = items.map((item: any) => {
      const singleItem: singleItem = {
        name: item.product,
        store: item.store,
        price: item.price,
        image: item.imagePath,
        amount: item.amount,
        desc: item.description,
        key: item.pid.toString(),
      };
      return singleItem;
    });

    return singleItems.map((item) => enhanceItemForDisplay(item));
  } catch (error) {
    console.error("Error constructing or fetching products:", error);
    return [];
  }
}

const searchProducts = async (query: string) => {
  try {
    const response = await fetch(
      `http://10.0.2.2:3000/api/search?search=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

/**
 * Enhance an item with display properties like background color and multiple stores
 */
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
    // Convert store field to stores field for consistency with FeaturedItems
    stores: generateRandomStores(item.store),
    // Keep original store field for compatibility
    store: item.store
  };
}

/**
 * Generate a comma-separated list of stores including the primary store
 * and 1-2 random additional stores
 */
function generateRandomStores(primaryStore: string): string {
  const allStores = ["Walmart", "Safeway", "Trader Joes", "Target"];
  const storeSet = new Set<string>([primaryStore]);

  // Add 1-2 more random stores
  const additionalStores = Math.floor(Math.random() * 2) + 1;

  for (let i = 0; i < additionalStores; i++) {
    const randomStore = allStores[Math.floor(Math.random() * allStores.length)];
    storeSet.add(randomStore);
  }

  return Array.from(storeSet).join(',');
}