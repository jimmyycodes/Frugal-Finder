import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Props for the FeaturedItems component
interface FeaturedItemsProps {
  products: Array<{
    id: number;
    name: string;
    price: string;
    image: any;
    weight: string;
  }>;
}

// Component to display a list of featured products
export default function FeaturedItems({ products }: FeaturedItemsProps) {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured Products</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.favoriteIcon}>
              <Ionicons
                name={favorites.includes(item.id) ? 'heart' : 'heart-outline'}
                size={24}
                color={favorites.includes(item.id) ? 'red' : 'gray'}
              />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.productListColumn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
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
    position: 'relative',
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
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  productWeight: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
});