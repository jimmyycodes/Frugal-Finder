import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

const categories = [
  { id: 1, name: 'Vegetables', image: require('@/assets/images/categoryIcons/veggies.svg') },
  { id: 2, name: 'Fruits', image: require('@/assets/images/categoryIcons/fruits.svg') },
  { id: 3, name: 'Beverages', image: require('@/assets/images/categoryIcons/beverages.svg') },
  { id: 4, name: 'Grocery', image: require('@/assets/images/categoryIcons/groceries.svg') },
  { id: 5, name: 'Edible Oil', image: require('@/assets/images/categoryIcons/oil.svg') },
  { id: 6, name: 'Household', image: require('@/assets/images/categoryIcons/household.svg') },
];

export default function CategoriesSection() {
  return (
    <View>
      <Text>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((cat) => (
          <TouchableOpacity key={cat.id} style={styles.categoryItem}>
            <Image source={cat.image} style={styles.categoryImage} />
          <Text style={styles.categoryText}>{cat.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  categoriesContainer: {
    marginTop: 16,
    height: 100, // Adjust height as needed
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 4,
  },
  categoryText: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
});