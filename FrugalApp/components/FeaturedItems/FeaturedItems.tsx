import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

type Product = {
  id: number;
  name: string;
  price: string;
  image: any;
};

type FeaturedItemsProps = {
  products: Product[];
};

export default function FeaturedItems({ products }: FeaturedItemsProps) {
  return (
    <View>
      <Text style={styles.featuredProductsText}>Featured Products</Text>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={styles.productListColumn}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productItem}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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