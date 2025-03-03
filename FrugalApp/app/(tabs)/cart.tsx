import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { useState } from "react";
import { mockItems } from "@/constants/MockVars";
import genLongItems from "@/constants/Tools";

export default function Cart() {
  const [items, setItems] = useState(genLongItems(mockItems, () => null, () => null, false));

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
          <Text style={styles.text}>$9.42</Text>
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
