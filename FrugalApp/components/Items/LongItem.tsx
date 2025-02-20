import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Animated,
} from "react-native";
import { Dimensions } from "react-native";
import StoreIcon from "../Icons/StoreIcon";
import { RemoveCartIcon, AddToCartIcon } from "../Icons/SvgHandler";
import { useRef } from "react";

const { height, width } = Dimensions.get("window");

type LongItemProps = {
  name: string;
  store: string;
  price: number;
  image: string;
  amount: string;
  canAdd?: boolean;
  onRemove?: () => void;
  onAdd?: () => void;
};

export default function LongItem({
  name,
  store,
  price,
  image,
  amount,
  canAdd,
  onRemove,
  onAdd,
}: LongItemProps) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;
  const delay = 500;

  // fade only starts if canAdd is false
  const startAnim = () => {
    if (!canAdd) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: delay,
        useNativeDriver: true,
      }).start();
    } // else if canAdd it should fade to green
    else {
      Animated.timing(colorAnim, {
        toValue: 1,
        duration: delay,
        useNativeDriver: true,
      }).start();
    }
  };

  const stopAnim = () => {
    if (!canAdd) {
      fadeAnim.stopAnimation(() => {
        fadeAnim.setValue(1);
      });
    } else {
      colorAnim.stopAnimation(() => {
        colorAnim.setValue(0);
      });
    }
  };

  const handleLongPress = () => {
    stopAnim();
    if (canAdd) {
      onAdd && onAdd();
    } else if (!canAdd) {
      onRemove && onRemove();
    }
  };

  const removeX = (
    <Pressable
      onPressIn={startAnim}
      onPressOut={stopAnim}
      onLongPress={handleLongPress}
      delayLongPress={delay}
      style={styles.removeAddContainer}
    >
      <RemoveCartIcon fill="#868889" width={25} height={25} />
    </Pressable>
  );

  const addButton = (
    <Pressable
      onPress={onAdd}
      style={styles.removeAddContainer}
      onPressIn={startAnim}
      onPressOut={stopAnim}
      onLongPress={handleLongPress}
      delayLongPress={delay}
    >
      <AddToCartIcon width={70} />
    </Pressable>
  );

  const animatedStyle = canAdd
    ? {
        backgroundColor: colorAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ["#FFFFFF", "#F2FFE6"],
        }),
      }
    : { opacity: fadeAnim };

  const Item = ( //TODO: Place green fade over entiere item
    <Animated.View style={[styles.container, animatedStyle]}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <View style={styles.iconContainer}>
          <StoreIcon store={store} />
          <Text>{store}</Text>
        </View>

        <Text style={styles.title}>{name}</Text>

        <View style={styles.ammountsCOntainer}>
          <Text style={styles.price}>{"$" + price.toFixed(2)}</Text>
          <Text style={styles.ammount}>{amount}</Text>
        </View>
      </View>
      <View style={styles.rightSpacer}>{canAdd ? addButton : removeX}</View>
    </Animated.View>
  );

  return Item;
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: 100,
    flexDirection: "row",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flexDirection: "column",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ammountsCOntainer: {
    flexDirection: "row",
    gap: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    color: "#6CC51D",
  },
  ammount: {
    color: "#868889",
  },
  rightSpacer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
  },
  removeAddContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
    width: 50,
  },
});
