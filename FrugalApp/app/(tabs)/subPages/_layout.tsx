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
          headerShown: true,
          headerTitleAlign: "center",
          headerLeft: backButton,
        }}
      />
      <Stack.Screen
        name="productDetails"
        options={{ headerShown: false, title: "Product Details" }}
      />
      <Stack.Screen
        name="productDetailsMock"
        options={{ headerShown: false, title: "Product Details Mock" }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 20,
    left: 30,
    zIndex: 100,
  },
})
