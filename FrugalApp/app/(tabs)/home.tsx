import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoriesSection from '@/components/Categories/CategoriesSection';
import FeaturedItems from '@/components/FeaturedItems/FeaturedItems';
import SearchBar from '@/components/Buttons/SearchBar';
import { useRouter } from 'expo-router';

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const navigation = useRouter();

  const handleSearch = () => {
    navigation.push({ pathname: "/(tabs)/subPages/search", params: { searchText} });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Search Bar */}
        <SearchBar
          onFilterPress={() => console.log('Filter pressed')}
          onTextUpdate={setSearchText}
          onSubmit={handleSearch}
          onFocus={() => console.log('Search focused')}
          onFocusStop={() => console.log('Search focus stopped')}
        />

        {/* Ready to Save Banner */}
        <View style={styles.readyToSaveContainer}>
          <Text style={styles.readyToSaveText}>Ready to Save?</Text>
          <Image source={require('@/assets/images/bagFruit.png')} style={styles.readyToSaveImage} />
        </View>

        {/* Categories Section */}
        <CategoriesSection />

        {/* Featured Products */}
        <FeaturedItems />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#666',
  },
  readyToSaveContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  readyToSaveText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  readyToSaveImage: {
    width: '100%',
    height: 250,
    left: 40,
  },
  bannerContainer: {
    marginTop: 16,
  },
  bannerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    marginTop: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
  categoryText: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 4,
  },
});