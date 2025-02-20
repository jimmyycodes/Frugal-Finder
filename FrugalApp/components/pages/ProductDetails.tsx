import { View, Text, StyleSheet, Image } from "react-native";
import StoreList from "../Icons/StoreList";
import FavButton from "../Buttons/FavButton";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/types/navigation";
import PrimaryButton from "../Buttons/PrimaryButton";
import LongItem from "../Items/LongItem";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";

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
          <Text style={styles.desc}>
            {
              "Organic Mountain works as a seller for many organic growers of organic lemons. Organic lemons are easy to spot in your produce aisle. They are just like regular lemons, but they will usually have a few more scars on the outside of the lemon skin. Organic lemons are considered to be the world's finest lemon for juicing"
            }
          </Text>
        </View>
      </View>

      <Quantity />
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

function Quantity() {

  return (
    <View style={QuantStyles.container}>
      <Text>Quantity</Text>
    </View>
  );

}

const QuantStyles = StyleSheet.create({

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFFFFF",
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
    fontSize: 20,
  },

});

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
  ammount: {
    color: "#868889",
    paddingBottom: 10,
  },
  desc: {
    paddingTop: 10,
    color: "#868889",
  },
});
