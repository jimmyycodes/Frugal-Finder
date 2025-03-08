import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { useState } from "react";
import { mockItems } from "@/constants/MockVars";
import {genLongItems} from "@/constants/Tools";
import useCartStore from "@/services/cartStore";

export default function Cart() {
  // Define Cart Store
  const cartItems = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  // Hooks
  const [items, setItems] = useState(genLongItems(cartItems, handleRemove, () => null, false));
  const [total, setTotal] = useState(0);

  // Effects
  // TODO: This is a temporary solution to update the cart items. It should be replaced with a more efficient solution
  // not using genLongItems for every update
  useEffect(() => {
    setItems(genLongItems(cartItems, handleRemove, () => null, false));
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price;
    });
    setTotal(total);
  }, [cartItems]);

  function handleRemove (key: string) {
    removeFromCart(key);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.scrollCont}>
          {items}
        </View>
      </ScrollView>
      <View style={styles.totals}>
        <View style={styles.textCont}>
          <Text style={styles.text}>Subtotal:</Text>
          <Text style={styles.text}>{"$" + total.toFixed(2)}</Text>
        </View>
        <PrimaryButton
          title="Create A Plan!"
          onPress={() => console.log("Checkout")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollCont: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  totals: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "white",
    width: "100%",
    height: 150,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Popins",
  },
  textCont: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});


