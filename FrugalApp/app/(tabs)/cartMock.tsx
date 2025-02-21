import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import LongItem from "@/components/Items/LongItem";
import PrimaryButton from "@/components/Buttons/PrimaryButton";

export default function CartMock() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.scrollCont}>
          <LongItem
            name="Extra Large Green Se..."
            store="Target"
            image="https://target.scene7.com/is/image/Target/GUEST_27ecaa50-cac2-49f8-9a9b-e59800e28d8a?wid=1200&hei=1200&qlt=80&fmt=webp"
            amount="1.50 lbs"
            price={4.29}
          />
          <LongItem
            name="Fresh Green Seedles..."
            store="Walmart"
            image="https://i5.walmartimages.com/seo/Fresh-Green-Seedless-Grapes-2-25-lbs-Bag-Est_9b543e57-d12c-4b2f-af70-cbfc8166dce1.19eafb20170233f7df74f7a6c5ff5530.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF"
            amount="2.25 lbs"
            price={5.13}
          />
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
