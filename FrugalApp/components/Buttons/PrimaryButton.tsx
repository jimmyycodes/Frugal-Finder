import { View, Text, StyleSheet, Pressable } from "react-native";
import { PrimaryButton as ButtonSvg } from "../Icons/SvgHandler";

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
};

export default function PrimaryButton({ title, onPress }: PrimaryButtonProps)
{
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <ButtonSvg style={styles.button} />
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
  button: {
    marginTop: 15,
  },

});