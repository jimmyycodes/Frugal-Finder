import { singleItem } from "./Types";
import LongItem from "@/components/Items/LongItem";

// Function to generate LongItems from singleItems
function genLongItems(items: singleItem[], onRemove: (key: string) => void, onAdd: (item: singleItem) => void, canAdd?: boolean) {
  return items.map((item) => (
    <LongItem
      name={item.name}
      store={item.store}
      price={item.price}
      image={item.image}
      amount={item.amount}
      canAdd={canAdd}
      onRemove={onRemove}
      onAdd={onAdd}
      itemKey={item.key}
      key={item.key}
    />
  ));
}

function addItem(items: singleItem[], newItem: singleItem): singleItem[] {
  const newItems = [...items, newItem];
  return newItems;
}

function addItemToCart(newItem: singleItem, items: singleItem[]): singleItem[] | undefined {
  // add cart logic here

  if (items) {
    return addItem(items, newItem);
  } else {
    return undefined;
  }
}

function removeItem(items: singleItem[], itemKey: string): singleItem[] {
  const newItems = items.filter((item) => item.key !== itemKey);
  return newItems;
}

function removeFromCart(itemKey: string, items?: singleItem[]): singleItem[] | undefined { // TODO: duplicate keys can be a problem
  // remove cart logic here

  if (items) {
    return removeItem(items, itemKey);
  } else {
    return undefined;
  }
}

export default genLongItems;