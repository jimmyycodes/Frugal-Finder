import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StoreList from '@/components/Icons/StoreList';
import LongItem from '../Items/LongItem';
import { mockItems } from '@/constants/MockVars';
import { useRouter } from 'expo-router';
import { singleItem } from '@/constants/Types';
import { searchItems } from '@/services/searchService';



function commaToList(values: string): string[] {
  return values.split(',').map(item => item.trim());
}

export default function FeaturedItems() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const router = useRouter();
  const [products, setProducts] = useState<singleItem[]>([]);

  useEffect(() => {
    // Do search
    const callSearch = async () => {
      const results = await searchItems('meat');
      setProducts(results);
    };

    callSearch();
  }
  , []);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleAdd = (id: number) => {
    console.log('Added item:', id);
  };

  const handleRemove = (id: number) => {
    console.log('Removed item:', id);
  };

  const renderGridView = () => (
    <View style={styles.productsContainer}>
      {products.map((item) => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(tabs)/subPages/productDetails",
              params: { items: JSON.stringify([item]), desc: item.desc },
            })
          }
          key={item.key}
          style={styles.productItem}
        >
          <TouchableOpacity
            style={styles.heartButton}
            onPress={() => alert("Feature not implemented")}
          >
            <Ionicons name={"heart-outline"} size={24} color={"grey"} />
          </TouchableOpacity>
          <View style={[styles.imageContainer, { backgroundColor: "#D9FEB8" }]}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
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
      <View style={styles.header}>
        <Text style={styles.featuredProductsText}>Featured Products</Text>
        <TouchableOpacity onPress={() => alert("Feature not implemented")}>
          <Ionicons
            name={viewMode === 'grid' ? 'list' : 'grid'}
            size={24}
            color="#333"
          />
        </TouchableOpacity>
      </View>
      {renderGridView()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  featuredProductsText: {
    fontSize: 18,
    fontWeight: '600',
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  listContainer: {
    flex: 1,
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
    justifyContent: 'flex-end',
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
    color: '#999',
    fontSize: 12,
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
