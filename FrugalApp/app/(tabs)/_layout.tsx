/**
 * All files in the (tabs) dir are screens that will be displayed under the tabs bar.
 * The tabs bar style is defined in this file.
 */

import { Tabs } from 'expo-router';
import { StyleSheet, TouchableOpacity, Text, GestureResponderEvent } from 'react-native';

// Define props for custom tab bar button
interface CustomTabBarButtonProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}

// Custom button component for tab bar
function CustomTabBarButton({ children, onPress }: CustomTabBarButtonProps) {
  return (
    <TouchableOpacity
      style={styles.tabBarButton}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}

export default function TabsComponent() {

  return (
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
          tabBarButton: (props) => (
            <CustomTabBarButton {...props}>
              <Text style={styles.tabBarButtonText}>Home</Text>
            </CustomTabBarButton>
          ),
        }}
      />
      <Tabs.Screen
        name="heart"
        options={{
          title: "Heart",
          tabBarButton: (props) => (
            <CustomTabBarButton {...props}>
              <Text style={styles.tabBarButtonText}>Heart</Text>
            </CustomTabBarButton>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Bag",
          tabBarButton: (props) => (
            <CustomTabBarButton {...props}>
              <Text style={styles.tabBarButtonText}>Bag</Text>
            </CustomTabBarButton>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="productDetails"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="productDetailsMock"
        options={{ href: null }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribute buttons evenly
    alignItems: 'center',
    height: 70,
    backgroundColor: 'white',
    paddingHorizontal: 20, // Add padding to the left and right
  },
  tabBarButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 30, // Half of the width/height to make it circular
    margin: 10,
  },
  tabBarButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});