import { render } from '@testing-library/react-native';
import Home from '../app/(tabs)/home';
import React from 'react';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

// Name: Example test
// Desctiption: Test if the App renders correctly
// Pre-conditions: None
// Post-conditions: App renders correctly
test('App renders correctly', () => {
  const tree = render(
    <Home />
  );
  expect(tree).toBeTruthy();
});