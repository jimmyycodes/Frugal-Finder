import { render } from '@testing-library/react-native';
import HomeScreen from '../app/(tabs)/index';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

// Name: Example test
// Desctiption: Test if the App renders correctly
// Pre-conditions: None
// Post-conditions: App renders correctly
test('App renders correctly', () => {
  const tree = render(<HomeScreen />);
  expect(tree).toBeTruthy();
});