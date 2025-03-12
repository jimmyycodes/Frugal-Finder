import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';

// Define category data
const categories = [
  { id: 1, name: 'Fruits', image: require('@/assets/images/categoryIcons/fruits.png') },
  { id: 2, name: 'Vegetables', image: require('@/assets/images/categoryIcons/vegetables.png') },
  { id: 3, name: 'Beverages', image: require('@/assets/images/categoryIcons/beverages.png') },
  { id: 4, name: 'Household', image: require('@/assets/images/categoryIcons/household.png') },
  { id: 5, name: 'Cooking Oil', image: require('@/assets/images/categoryIcons/oil.png') },
  { id: 6, name: 'Grocery', image: require('@/assets/images/categoryIcons/grocery.png') },
];

export default function CategoriesSection() {
  const router = useRouter();

  const handleCategoryPress = (category: string) => {
    // Navigate to search page with category as parameter
    router.replace({
      pathname: "/(tabs)/subPages/search",
      params: { searchText: category }
    });
  };

  return (
    <View>
      <Text style={styles.title}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryItem}
            onPress={() => handleCategoryPress(category.name)}
          >
            <View style={styles.iconBackground}>
              <Image source={category.image} style={styles.categoryIcon} resizeMode="contain" />
            </View>
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
  categoriesContainer: {
    marginTop: 16,
    height: 120, // Increased height to accommodate larger icons
    paddingHorizontal: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 80, // Increased width for category item
  },
  iconBackground: {
    width: 65, // Increased size from 60 to 75
    height: 65, // Increased size from 60 to 75
    borderRadius: 37.5, // Half of width/height for perfect circle
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 50, // Increased size from 35 to 50
    height: 50, // Increased size from 35 to 50
  },
  categoryText: {
    marginTop: 8,
    fontSize: 13, // Slightly larger text
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  }
});