import { Stack } from "expo-router";
import BackButton from "@/components/Buttons/BackButton";
import { View, StyleSheet } from "react-native";

export const unstable_settings = {
  initialRouteName: "search",
};

const backButton = () => {
  return (
    <View style={styles.backButton}>
      <BackButton />
    </View>
  );
};

export default function SearchFlowLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: true,
          headerTitleAlign: "center",
          headerLeft: backButton,
        }}
      />
      <Stack.Screen
        name="productDetails"
        options={{ headerShown: false, title: "Product Details" }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 10,
    left: 15,
    zIndex: 100,
  },
});
