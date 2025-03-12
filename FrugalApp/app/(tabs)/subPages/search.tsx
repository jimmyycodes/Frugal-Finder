import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '@/components/Buttons/SearchBar';
import StoreList from '@/components/Icons/StoreList';
import { searchItems } from '@/services/searchService';

export default function Search() {
  const { searchText } = useLocalSearchParams();
  const router = useRouter();
  const [newSearchText, setNewSearchText] = useState(searchText as string || '');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    // Do search
    const callSearch = async () => {
      setIsLoading(true);
      const results = await searchItems(searchText as string || '');
      setSearchResults(results);
      setIsLoading(false);
    };

    callSearch();
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

  const handleAdd = (key: string) => {
    console.log('Added item:', key);
  };

  const handleRemove = (key: string) => {
    console.log('Removed item:', key);
  };

  const renderGridView = () => (
    <View style={styles.productsContainer}>
      {searchResults.map((item) => (
        <TouchableOpacity
          key={item.key}
          onPress={() => router.push({
            pathname: "/(tabs)/subPages/productDetails",
            params: { items: JSON.stringify([item]), desc: item.description }
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
          <View style={[styles.imageContainer, { backgroundColor: item.backgroundColor || '#F5FFE1' }]}>
            <Image
              source={{ uri: item.image || "https://jchost.pl/blog/wp-content/uploads/2020/03/blad-429-too-many-requests-300x160.png" }}
              style={styles.productImage}
            />
          </View>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productWeight}>{item.amount}</Text>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          <View style={styles.storeIconsContainer}>
            <StoreList stores={[item.store]} />
          </View>
        </TouchableOpacity>
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
              renderGridView()
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
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  resultHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
  },
  highlight: {
    fontWeight: '600',
    color: '#000',
  },
  viewToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeToggle: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginLeft: 8,
  },
  inactiveToggle: {
    padding: 8,
    marginLeft: 8,
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
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  noResultsText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  noResultsSubText: {
    marginTop: 8,
    fontSize: 14,
    color: '#999',
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  productItem: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    position: 'relative',
    height: 250,
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
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    // marginBottom: 0,
    height: 40,
  },
  productWeight: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6CC51D',
    marginBottom: 4,
  },
  storeIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 8,
  },
  listContainer: {
    padding: 16,
  },
});