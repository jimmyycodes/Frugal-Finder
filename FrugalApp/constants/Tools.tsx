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

function removeItem(items: singleItem[], itemKey: string): singleItem[] {
  const newItems = items.filter((item) => item.key !== itemKey);
  return newItems;
}

export { genLongItems, addItem, removeItem };