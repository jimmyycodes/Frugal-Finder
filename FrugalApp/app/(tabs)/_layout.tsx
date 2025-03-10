/**
 * All files in the (tabs) dir are screens that will be displayed under the tabs bar.
 * The tabs bar style is defined in this file.
 */

// TODO: The nav button press area is too big

import { Tabs } from "expo-router";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import {
  HomepageIcon,
  CartPageIcon,
  LocationIcon,
} from "@/components/Icons/SvgHandler";
import BackButton from "@/components/Buttons/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";

// Define props for custom tab bar button
interface CustomTabBarButtonProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}

// Custom button component for tab bar
function CustomTabBarButton({ children, onPress }: CustomTabBarButtonProps) {
  return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
}

export default function TabsComponent() {
  return (
    <SafeAreaView style={styles.safeContainer} edges={["bottom"]}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarHideOnKeyboard: false,
            tabBarButton: (props) => (
              <CustomTabBarButton {...props}>
                <View style={styles.tabBarButton}>
                  <HomepageIcon />
                </View>
              </CustomTabBarButton>
            ),
          }}
        />
        <Tabs.Screen
          name="plan"
          options={{
            headerTitleAlign: "center",
            headerShown: true,
            title: "Your Plan",
            tabBarHideOnKeyboard: false,
            tabBarButton: (props) => (
              <CustomTabBarButton {...props}>
                <View style={styles.tabBarButton}>
                  <LocationIcon />
                </View>
              </CustomTabBarButton>
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "Shopping Cart",
            headerTitleAlign: "center",
            headerShown: true,
            tabBarHideOnKeyboard: false,
            tabBarButton: (props) => (
              <View style={styles.tabBarButton}>
                <CustomTabBarButton {...props}>
                  <CartPageIcon />
                </CustomTabBarButton>
              </View>
            ),
          }}
        />
        <Tabs.Screen name="subPages" options={{ href: null }} />
      </Tabs>
    </SafeAreaView>
  );
}

const backButton = () => {
  return (
    <View style={styles.backButton}>
      <BackButton />
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 57,
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
    position: "absolute",
    bottom: 0,
  },
  tabBarButton: {
    width: 47,
    left: 43,
  },
  tabBarButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 30,
    zIndex: 100,
  },
  safeContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
