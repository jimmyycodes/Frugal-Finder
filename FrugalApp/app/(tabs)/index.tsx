import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import CategoriesSection from '@/components/Categories/CategoriesSection';
import FeaturedItems from '@/components/FeaturedItems/FeaturedItems';


const products = [
  { id: 1, name: 'Fresh Peach', price: '$5.00 - $8.00', image: require('@/assets/images/bagFruit.svg') },
  { id: 2, name: 'Organic Apple', price: '$3.00 - $5.00', image: require('@/assets/images/bagFruit.svg') },
  { id: 3, name: 'Banana Bunch', price: '$2.00 - $4.00', image: require('@/assets/images/bagFruit.svg') },
  { id: 4, name: 'Carrot Pack', price: '$1.50 - $3.00', image: require('@/assets/images/bagFruit.svg') },
  { id: 5, name: 'Tomato Pack', price: '$2.50 - $4.50', image: require('@/assets/images/bagFruit.svg') },
  { id: 6, name: 'Broccoli Bunch', price: '$3.00 - $5.00', image: require('@/assets/images/bagFruit.svg') },
];

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const theme = useColorScheme() ?? 'dark';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
        <TextInput
          placeholder="Search keywords..."
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Ready to Save Banner */}
      <View style={styles.readyToSaveContainer}>
        <Text style={styles.readyToSaveText}>Ready to Save?</Text>
        <Image source={require('@/assets/images/bagFruit.svg')} style={styles.readyToSaveImage} />
      </View>

      {/* Categories Section */}
      <CategoriesSection />

      {/* Featured Products */}
      <FeaturedItems products={products} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
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
    height: 160,
    borderRadius: 8,
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
  featuredProductsText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
  },
  productListColumn: {
    justifyContent: 'space-between',
  },
  productItem: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    width: '48%',
  },
  productImage: {
    width: '100%',
    height: 112,
    borderRadius: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  productPrice: {
    color: '#999',
    fontSize: 12,
  },
});