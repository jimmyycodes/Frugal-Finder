import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';

interface CustomTabBarButtonProps {
  children: React.ReactNode;
  onPress?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void;
}

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

export default function TabLayout() {
  const colorScheme = useColorScheme();

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