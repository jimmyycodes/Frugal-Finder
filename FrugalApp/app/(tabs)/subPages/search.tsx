import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '@/components/Buttons/SearchBar';
import StoreList from '@/components/Icons/StoreList';
import LongItem from '@/components/Items/LongItem';
import { searchItems } from '@/services/searchService';
import { singleItem } from '@/constants/Types';

export default function Search() {
  const { searchText } = useLocalSearchParams();
  const router = useRouter();
  const [newSearchText, setNewSearchText] = useState(searchText as string || '');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<singleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    // Perform search when searchText changes
    setIsLoading(true);

    // Simulate API request delay
    setTimeout(() => {
      const results = searchItems(searchText as string || '');
      setSearchResults(results);
      setIsLoading(false);
    }, 800);
  }, [searchText]);

  const toggleFavorite = (key: string) => {
    setFavorites(prev =>
      prev.includes(key) ? prev.filter(itemKey => itemKey !== key) : [...prev, key]
    );
  };

  const handleSearch = () => {
    if (newSearchText?.trim()) {
      router.replace({ pathname: "/(tabs)/subPages/search", params: { searchText: newSearchText } });
    }
  };

  function commaToList(values: string): string[] {
    if (!values) return [];
    return values.split(',').map(item => item.trim());
  }

  const handleAddToCart = (item: singleItem) => {
    console.log(`Added ${item.name} to cart`);
  };

  const handleRemoveFromCart = (key: string) => {
    console.log(`Removed item ${key} from cart`);
  };

  const renderGridView = () => (
    <View style={styles.productsContainer}>
      {searchResults.map((item) => (
        <TouchableOpacity
          key={item.key}
          onPress={() => router.push({
            pathname: "/(tabs)/subPages/productDetails",
            params: { productId: item.key }
          })}
          style={styles.productItem}
        >
          <TouchableOpacity
            style={styles.heartButton}
            onPress={() => toggleFavorite(item.key)}
          >
            <Ionicons
              name={favorites.includes(item.key) ? "heart" : "heart-outline"}
              size={24}
              color={favorites.includes(item.key) ? "red" : "gray"}
            />
          </TouchableOpacity>
          <View style={[styles.imageContainer]}>
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
            />
          </View>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productWeight}>{item.amount}</Text>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          <View style={styles.storeIconsContainer}>
            <StoreList stores={commaToList(item.store || item.store)}/>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderListView = () => (
    <View style={styles.listContainer}>
      {searchResults.map((item) => (
        <LongItem
          key={item.key}
          itemKey={item.key}
          name={item.name}
          price={item.price}
          amount={item.amount}
          store={item.store}
          image={item.image}
          canAdd={true}
          onAdd={() => handleAddToCart(item)}
          onRemove={() => handleRemoveFromCart(item.key)}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar
          onFilterPress={() => console.log('Filter pressed')}
          onTextUpdate={setNewSearchText}
          onSubmit={handleSearch}
          onFocus={() => console.log('Search focused')}
          onFocusStop={() => console.log('Search focus stopped')}
        />
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6CC51D" />
          <Text style={styles.loadingText}>Searching products...</Text>
        </View>
      ) : (
        <>
          <View style={styles.resultHeaderContainer}>
            <Text style={styles.resultsText}>
              Showing results for "<Text style={styles.highlight}>{searchText}</Text>"
            </Text>
            <View style={styles.viewToggle}>
              <TouchableOpacity onPress={() => setViewMode('grid')} style={viewMode === 'grid' ? styles.activeToggle : styles.inactiveToggle}>
                <Ionicons name="grid-outline" size={24} color={viewMode === 'grid' ? "#6CC51D" : "#999"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setViewMode('list')} style={viewMode === 'list' ? styles.activeToggle : styles.inactiveToggle}>
                <Ionicons name="list-outline" size={24} color={viewMode === 'list' ? "#6CC51D" : "#999"} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView>
            {searchResults.length === 0 ? (
              <View style={styles.noResultsContainer}>
                <Ionicons name="search-outline" size={64} color="#ccc" />
                <Text style={styles.noResultsText}>No results found</Text>
                <Text style={styles.noResultsSubText}>Try a different search term</Text>
              </View>
            ) : (
              viewMode === 'grid' ? renderGridView() : renderListView()
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  resultHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  resultsText: {
    fontSize: 16,
    flex: 1,
  },
  highlight: {
    color: '#6CC51D',
    fontWeight: 'bold',
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 16,
    color: '#333',
  },
  noResultsSubText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  viewToggle: {
    flexDirection: 'row',
  },
  activeToggle: {
    padding: 8,
    backgroundColor: '#F2FFE6',
    borderRadius: 8,
    marginLeft: 8,
  },
  inactiveToggle: {
    padding: 8,
    marginLeft: 8,
  },
  productsContainer: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  listContainer: {
    padding: 16,
  },
  productItem: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
    width: '48%',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#f0f0f0',
    position: 'relative',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    padding: 4,
  },
  imageContainer: {
    borderRadius: 50,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
  productImage: {
    resizeMode: 'contain',
    width: '80%',
    height: '80%',
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  productWeight: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  productPrice: {
    color: '#6CC51D',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 4,
  },
  storeIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 8,
    paddingHorizontal: 4,
  },
});