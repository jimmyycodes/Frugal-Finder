import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';

// Define the route prop type for the SearchResults screen
type SearchResultsRouteProp = RouteProp<RootStackParamList, 'SearchResults'>;

// This component displays search results based on the searchText parameter
export default function SearchResults() {
  const navigation = useNavigation();
  const route = useRoute<SearchResultsRouteProp>();
  const { searchText } = route.params; // Extract searchText from route parameters

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Showing results for "{searchText}"</Text>
      <Button title="Back" onPress={() => navigation.goBack()} /> {/* Button to navigate back */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});