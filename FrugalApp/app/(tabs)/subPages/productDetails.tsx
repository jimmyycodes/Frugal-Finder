import { View, Text, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import StoreList from "@/components/Icons/StoreList";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { useEffect, useState } from "react";
import { PlusIcon, MinusIcon } from "@/components/Icons/SvgHandler";
import FavButton from "@/components/Buttons/FavButton";
import { singleItem } from "@/constants/Types";
import { genLongItems } from "@/constants/Tools";
import { mockItems } from "@/constants/MockVars";
import { useLocalSearchParams } from "expo-router";
import useCartStore from "@/services/cartStore";

export default function ProductDetails() {
  // Define Cart Store
  const addToCart = useCartStore((state) => state.addToCart);

  // Get params
  const { items, descParam } = useLocalSearchParams();

  let itemsUsed = mockItems;
  let desc = descParam as string;

  try {
    if (items) {
      itemsUsed = JSON.parse(items as string) as singleItem[];
    }
  }
  catch (e) {
    console.log(e);
  }

  // Hooks
  const [longItems, setItems] = useState(genLongItems(itemsUsed, () => null, handleAdd, true));
  const [title, setTitle] = useState<string>(itemsUsed[0].name);
  const [allStores, setAllStores] = useState<string[]>(itemsUsed.map((item) => item.store).splice(0, 5));
  const [maxPrice, setMaxPrice] = useState<number>( itemsUsed.reduce((max, item) => (item.price > max ? item.price : max), 0));
  const [minPrice, setMinPrice] = useState<number>(itemsUsed.reduce((min, item) => (item.price < min ? item.price : min), maxPrice));
  const [price, setPrice] = useState<number | null>(minPrice === maxPrice ? minPrice : null);
  const [priceText, setPriceText] = useState<string | number>(price ? price : `${minPrice} - ${maxPrice}`);


  function handleAdd(item: singleItem) {
    addToCart(item);
  }

  // Effects
  useEffect(() => {

    itemsUsed = mockItems;
    desc = descParam as string;

    try {
      if (items) {
        itemsUsed = JSON.parse(items as string) as singleItem[];
      }
    }
    catch (e) {
      console.log(e);
    }

    setTitle(itemsUsed[0].name);
    setItems(genLongItems(itemsUsed, () => null, handleAdd, true));
    setAllStores(itemsUsed.map((item) => item.store).splice(0, 5));
    setMaxPrice(itemsUsed.reduce((max, item) => (item.price > max ? item.price : max), 0));
    setMinPrice(itemsUsed.reduce((min, item) => (item.price < min ? item.price : min), maxPrice));
    setPrice(minPrice === maxPrice ? minPrice : null);
    setPriceText(price ? price : `${minPrice} - ${maxPrice}`);
  }
  , [items]);

  // cut desc to 319 characters
  if (desc && desc.length > 319) {
    desc = desc.substring(0, 319) + "...";
  }

  // Functions
  const handleQuantity = (quantity: number) => {
    alert("Feature not implemented yet");
    return quantity;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.imageHeader}>
            <Image
              style={styles.HeaderImage}
              source={{
                uri: (itemsUsed[0].image)
              }}
            />
          </View>

          <View style={styles.favoriteButton}>
            <FavButton onPress={() => null} />
          </View>

          <View style={styles.textHeader}>
            <Text style={styles.price}>{priceText}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.amount}>{longItems.length + " results"}</Text>
            <StoreList stores={allStores} />
            <Text style={styles.desc}>
              {
                itemsUsed[0].desc
              }
            </Text>
          </View>
        </View>

        <Quantity
          setQuantity={(quantity: number) =>
            console.log(handleQuantity(quantity))
          }
        />

        <View style={styles.primaryButtonCont}>
          <PrimaryButton
            title="Add Cheapest to Cart"
            onPress={() => alert("Feature not implemented yet")}
          />
        </View>

        <View style={styles.longItemContainer}>
          {longItems}
        </View>
      </View>
    </ScrollView>
  );
}

type QuantityProps = {
  setQuantity: (quantity: number) => void;
};

function Quantity({ setQuantity }: QuantityProps) {
  const [quantity, setQuantityState] = useState(1);

  const setQuantityLocal = (quantity: number) => {
    if (quantity < 1) {
      setQuantityState(1);
      setQuantity(1);
      return;
    } else if (quantity > 10) {
      setQuantityState(10);
      setQuantity(10);
      return;
    }

    setQuantityState(quantity);
    setQuantity(quantity);
  };

  return (
    <View style={quantStyles.container}>
      <Text style={quantStyles.quantity}>Quantity</Text>
      <View style={quantStyles.addContainer}>
        <View style={quantStyles.buttons}>
          <Pressable onPress={() => setQuantityLocal(quantity + 1)}>
            <PlusIcon />
          </Pressable>

          <Text>{quantity}</Text>

          <Pressable onPress={() => setQuantityLocal(quantity - 1)}>
            <MinusIcon />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const quantStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFFFFF",
    width: "93%",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#F2FFE6",
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
  },
  quantity: {
    fontSize: 12,
    color: "#868889",
  },
  addContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  longItemContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  HeaderImage: {
    width: "100%",
    height: 200,
  },
  header: {
    width: "100%",
  },
  imageHeader: {},
  textHeader: {
    padding: 10,
    paddingBottom: 15,
  },
  favoriteButton: {
    position: "absolute",
    right: 20,
    top: 210,
    zIndex: 100,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6CC51D",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  amount: {
    color: "#868889",
    paddingBottom: 10,
  },
  desc: {
    paddingTop: 10,
    color: "#868889",
  },
  primaryButtonCont: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 100,
  },
});
