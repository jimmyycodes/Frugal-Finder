import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchResults from '@/app/(tabs)/SearchResults';
import { RootStackParamList } from '@/types/navigation';

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

// Create a stack navigator for the app
const Stack = createStackNavigator<RootStackParamList>();

// Main navigator component for the app
function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={TabsComponent} options={{ headerShown: false }} />
      <Stack.Screen name="SearchResults" component={SearchResults} />
    </Stack.Navigator>
  );
}

// Component for rendering tab navigation
function TabsComponent() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="(tabs)/index"
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
        name="(tabs)/home"
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
        name="(tabs)/bag"
        options={{
          title: "Bag",
          tabBarButton: (props) => (
            <CustomTabBarButton {...props}>
              <Text style={styles.tabBarButtonText}>Bag</Text>
            </CustomTabBarButton>
          ),
        }}
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

export default AppNavigator;