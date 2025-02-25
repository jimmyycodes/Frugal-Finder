import { View, Text, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import StoreList from "@/components/Icons/StoreList";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { useState } from "react";
import LongItem from "@/components/Items/LongItem";
import { PlusIcon, MinusIcon } from "@/components/Icons/SvgHandler";
import FavButton from "@/components/Buttons/FavButton";
import BackButton from "@/components/Buttons/BackButton";

  // TODO: Long item names can be too long

export default function ProductDetailsMock() {

  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (quantity: number) => {
    setQuantity(quantity);
    return quantity;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.backButton}>
          <BackButton />
        </View>
        <View style={styles.header}>
          <View style={styles.imageHeader}>
            <Image
              style={styles.HeaderImage}
              source={{
                uri: "https://target.scene7.com/is/image/Target/GUEST_27ecaa50-cac2-49f8-9a9b-e59800e28d8a?wid=1200&hei=1200&qlt=80&fmt=webp",
              }}
            />
          </View>

          <View style={styles.favoriteButton}>
            <FavButton onPress={() => null} />
          </View>

          <View style={styles.textHeader}>
            <Text style={styles.price}>$4.29-$6.49</Text>
            <Text style={styles.title}>Green Seedless Grapes</Text>
            <Text style={styles.amount}>3 results</Text>
            <StoreList stores={["Target", "Walmart", "Trader joes"]} />
            <Text style={styles.desc}>
              {
                "Organic Mountain works as a seller for many organic growers of organic lemons. Organic lemons are easy to spot in your produce aisle. They are just like regular lemons, but they will usually have a few more scars on the outside of the lemon skin. Organic lemons are considered to be the world's finest lemon for juicing"
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
            title="Add to Cart"
            onPress={() => null}
          />
        </View>

        <View style={styles.longItemContainer}>
          <LongItem
            name="Extra Large Green Se..."
            store="Target"
            canAdd={true}
            image="https://target.scene7.com/is/image/Target/GUEST_27ecaa50-cac2-49f8-9a9b-e59800e28d8a?wid=1200&hei=1200&qlt=80&fmt=webp"
            amount="1.50 lbs"
            price={4.29}
          />
          <LongItem
            name="Fresh Green Seedles..."
            store="Walmart"
            canAdd={true}
            image="https://i5.walmartimages.com/seo/Fresh-Green-Seedless-Grapes-2-25-lbs-Bag-Est_9b543e57-d12c-4b2f-af70-cbfc8166dce1.19eafb20170233f7df74f7a6c5ff5530.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF"
            amount="2.25 lbs"
            price={5.13}
          />
          <LongItem
            name="Red and Green Grape..."
            store="Trader Joes"
            canAdd={true}
            image="https://www.traderjoes.com/content/dam/trjo/products/m20701/91984.png/jcr:content/renditions/webp-640.webp"
            amount="2 lbs"
            price={6.49}
          />
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
