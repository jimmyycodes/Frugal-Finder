import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StoreList from '@/components/Icons/StoreList';
import LongItem from '../Items/LongItem';

const products = [
  {
    id: 1,
    name: 'Fresh Baked Baguettes',
    price: 5.00,
    amount: '1 lb',
    stores: "Walmart,Trader Joes,Target",
    image: require('@/assets/images/produce/bread.png'),
    backgroundColor: '#FFDDC1',
    canAdd: true
  },
  {
    id: 2,
    name: 'Dairy Milk',
    price: 3.00,
    amount: '1 gal',
    stores: "Safeway,Walmart,Target",
    image: require('@/assets/images/produce/milk.png'),
    backgroundColor: '#C1E1FF',
    canAdd: true
  },
  {
    id: 3,
    name: 'Penne Pasta',
    price: 2.00,
    amount: '16 oz',
    stores: "Trader Joes,Safeway,Walmart",
    image: require('@/assets/images/produce/pasta.png'),
    backgroundColor: '#C1FFC1',
    canAdd: true
  },
  {
    id: 4,
    name: 'Filet Mignon',
    price: 1.50,
    amount: '8 oz',
    stores: "Walmart,Target,Safeway",
    image: require('@/assets/images/produce/steak.png'),
    backgroundColor: '#FFC1C1',
    canAdd: true
  },
  {
    id: 5,
    name: 'Specialty Wine',
    price: 2.50,
    amount: '750 ml',
    stores: "Safeway,Target,Trader Joes",
    image: require('@/assets/images/produce/wine.png'),
    backgroundColor: '#E1C1FF',
    canAdd: true
  },
  {
    id: 6,
    name: 'Organic Red Cabbage',
    price: 3.00,
    amount: '2 lbs',
    stores: "Trader Joes,Safeway,Target",
    image: require('@/assets/images/produce/purpleCabbage.png'),
    backgroundColor: '#FFF1C1',
    canAdd: true
  },
];

function commaToList(values: string): string[] {
  return values.split(',').map(item => item.trim());
}

export default function FeaturedItems() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
        <TouchableOpacity key={item.id} style={styles.productItem}>
          <TouchableOpacity
            style={styles.heartButton}
            onPress={() => toggleFavorite(item.id)}
          >
            <Ionicons
              name={favorites.includes(item.id) ? "heart" : "heart-outline"}
              size={24}
              color={favorites.includes(item.id) ? "red" : "gray"}
            />
          </TouchableOpacity>
          <View style={[styles.imageContainer, { backgroundColor: item.backgroundColor }]}>
            <Image source={item.image} style={styles.productImage} />
          </View>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productWeight}>{item.amount}</Text>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          <View style={styles.storeIconsContainer}>
            <StoreList stores={commaToList(item.stores)} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderListView = () => (
    <ScrollView style={styles.listContainer}>
      {products.map((item) => (
        <LongItem
          key={item.id.toString()}
          itemKey={item.id.toString()}
          name={item.name}
          price={item.price}
          amount={item.amount}
          store={commaToList(item.stores)[0]} // Pass first store for list view
          image={item.image}
          canAdd={item.canAdd}
          onAdd={() => handleAdd(item.id)}
          onRemove={() => handleRemove(item.id)}
        />
      ))}
    </ScrollView>
  );
// TODO: Fix button to switch between grid and list view
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.featuredProductsText}>Featured Products</Text>
        <TouchableOpacity onPress={() => console.log('Switch view mode broken')}>
          <Ionicons
            name={viewMode === 'grid' ? 'list' : 'grid'}
            size={24}
            color="#333"
          />
        </TouchableOpacity>
      </View>
      {viewMode === 'grid' ? renderGridView() : renderListView()}
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