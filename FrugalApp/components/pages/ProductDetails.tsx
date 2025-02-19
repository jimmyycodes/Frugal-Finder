import { View, Text, StyleSheet, Image } from "react-native";
import StoreList from "../Icons/StoreList";
import FavButton from "../Buttons/FavButton";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/types/navigation";
import PrimaryButton from "../Buttons/PrimaryButton";
import LongItem from "../Items/LongItem";

type ProductDetailsRouteProp = RouteProp<RootStackParamList, "ProductDetails">;

export default function ProductDetails() {
  const navigation = useNavigation();
  const route = useRoute<ProductDetailsRouteProp>();
  const productId = route.params?.productId || "No product ID provided";

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Product Details</Text>
      <Image />
      <Text>$5.00-$8.00</Text>
      <Text>Organic Lemons</Text>
      <Text>1.50 lbs</Text>
      <StoreList stores={["", "", "", ""]} />
      <Text>Description</Text>
      <PrimaryButton title="Add to Cart" onPress={() => null} />
      <View style={styles.longItemContainer}>
        <LongItem
        name="Organic Lemmons"
        store=""
        canAdd={true}
        image="https://fruitbubba.com/wp-content/uploads/2022/05/limones.png"
        amount="1.50 lbs"
        price={3.0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  longItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: "black",
  },
});
