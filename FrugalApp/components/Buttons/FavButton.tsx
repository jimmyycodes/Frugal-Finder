import { View, StyleSheet, Pressable } from "react-native";
import { EmptyHeartIcon, HeartFillIcon } from "../Icons/SvgHandler";
import { useState } from "react";

type ButtonProps = {
  onPress: () => void;
  defaultFav?: boolean;
};

const size = 20;

export default function FavButton({ onPress, defaultFav }: ButtonProps)
{
  const [isFav, setIsFav] = useState(defaultFav);

  const onPressLocal = () => {
    setIsFav(!isFav);
    onPress();
  }

  return (
    <Pressable onPress={onPressLocal}>
      <View style={styles.container}>
        {isFav ? <HeartFillIcon width={size} height={size} /> : <EmptyHeartIcon width={size} height={size}/>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});