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
      <View style={styles.header}>
        <View style={styles.imageHeader}>
          <Image
            style={styles.HeaderImage}
            source={{
              uri: "https://www.producemarketguide.com/media/user_RZKVrm5KkV/504/lemon_commodity-page.png",
            }}
          />
        </View>

        <View style={styles.favoriteButton}>
          <FavButton onPress={() => null} />
        </View>

        <View style={styles.textHeader}>
          <Text style={styles.price}>$5.00-$8.00</Text>
          <Text style={styles.title}>Organic Lemons</Text>
          <Text style={styles.ammount}>1.50 lbs</Text>
          <StoreList stores={["walmart", "Safeway", "", "", "Trader joes"]} />
          <Text>Description</Text>
        </View>
      </View>

      <PrimaryButton title="Add to Cart" onPress={() => null} />
      <View style={styles.longItemContainer}>
        <LongItem
          name="Organic Lemmons"
          store="Walmart"
          canAdd={true}
          image="https://api.algobook.info/v1/randomimage?category=food"
          amount="1.50 lbs"
          price={3.0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  longItemContainer: {
    flexDirection: "row",
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
  },
  favoriteButton: {
    position: "absolute",
    right: 20,
    top: 210,
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
  ammount: {
    color: "#868889",
  },
});
