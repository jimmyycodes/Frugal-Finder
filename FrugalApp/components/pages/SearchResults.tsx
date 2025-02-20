import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';
import SearchBar from '@/components/Buttons/SearchBar';

// Define the route prop type for the SearchResults screen
type SearchResultsRouteProp = RouteProp<RootStackParamList, 'SearchResults'>;
type SearchResultsNavigationProp = NavigationProp<RootStackParamList, 'SearchResults'>;

// This component displays search results based on the searchText parameter
export default function SearchResults() {
  const navigation = useNavigation<SearchResultsNavigationProp>();
  const route = useRoute<SearchResultsRouteProp>();
  const { searchText } = route.params; // Extract searchText from route parameters
  const [searchQuery, setSearchQuery] = useState(searchText);

  return (
    <View style={styles.container}>
      <SearchBar
        onFilterPress={() => console.log('Filter pressed')}
        onTextUpdate={setSearchQuery}
        onSubmit={() => {
          navigation.navigate('SearchResults', { searchText: searchQuery });
        }}
        onFocus={() => console.log('Search focused')}
        onFocusStop={() => console.log('Search focus stopped')}
      />
      <Text style={styles.text}>
        Showing results for <Text style={styles.searchText}>{searchText}</Text>
      </Text>
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
    color: 'black',
  },
  searchText: {
    color: 'blue',
  },
});