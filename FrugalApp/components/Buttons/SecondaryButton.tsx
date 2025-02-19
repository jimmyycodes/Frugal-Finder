import { View, Text, StyleSheet, Pressable } from "react-native";
import { SecondaryButton as ButtonSvg } from "../Icons/SvgHandler";

type ButtonProps = {
  title: string;
  onPress: () => void;
};

export default function SecondaryButton({ title, onPress }: ButtonProps)
{
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <ButtonSvg />
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({

  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width: 387,
    height: 71,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    position: "absolute",
    color: "white",
  },

});