import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const bagItems = [
  { id: 1, name: 'Fresh Peach', price: '$5.00', image: require('@/assets/images/bagFruit.svg') },
  { id: 2, name: 'Organic Apple', price: '$3.00', image: require('@/assets/images/bagFruit.svg') },
  { id: 3, name: 'Banana Bunch', price: '$2.00', image: require('@/assets/images/bagFruit.svg') },
];

export default function BagScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Bag</Text>
      <FlatList
        data={bagItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
            <TouchableOpacity style={styles.removeItemButton}>
              <Text style={styles.removeItemText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
  },
  removeItemButton: {
    padding: 8,
    backgroundColor: '#ff6666',
    borderRadius: 8,
  },
  removeItemText: {
    color: 'white',
    fontWeight: 'bold',
  },
});