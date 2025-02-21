import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

export default function CategoriesSection() {
  return (
    <View>
      <Text style={styles.title}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        <Image
          source={require('/Users/davidlym/Desktop/Frugal-Finder/FrugalApp/assets/images/categoryIcons/catItems.png')}
          style={styles.categoryIcons}
          resizeMode="contain"
        />
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
    height: 80,
    paddingHorizontal: 16,
  },
  categoryIcons: {
    height: '100%',
    width: 'auto',
    aspectRatio: 5, // Adjust this value based on your image's aspect ratio
  }
});