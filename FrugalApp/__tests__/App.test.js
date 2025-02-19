import { render } from '@testing-library/react-native';
import HomeScreen from '../app/(tabs)/index';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';


jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

// Name: Example test
// Desctiption: Test if the App renders correctly
// Pre-conditions: None
// Post-conditions: App renders correctly
test('App renders correctly', () => {
  const tree = render(
    <NavigationContainer>
      <HomeScreen />
    </NavigationContainer>
  );
  expect(tree).toBeTruthy();
});