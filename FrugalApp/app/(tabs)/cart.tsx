import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import LongItem from "@/components/Items/LongItem";
import PrimaryButton from "@/components/Buttons/PrimaryButton";

export default function Cart() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.scrollCont}>
          <LongItem
            name="Fresh Broccoli"
            store="Safeway"
            price={5}
            amount="1.50 lbs"
            image="https://picsum.photos/200/300"
          />
          <LongItem
            name="Fresh Broccoli"
            store="Safeway"
            price={5}
            amount="1.50 lbs"
            image="https://picsum.photos/200/300"
          />
        </View>
      </ScrollView>
      <View style={styles.totals}>
        <View style={styles.textCont}>
          <Text style={styles.text}>Subtotal:</Text>
          <Text style={styles.text}>$10.00</Text>
        </View>
        <PrimaryButton title="Create A Plan!" onPress={() => console.log("Checkout")} />
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
  textCont:
  {
    flexDirection: "row",
    justifyContent: "space-between",
  }
});
