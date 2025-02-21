import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import SearchBar from '@/components/Buttons/SearchBar';
import StoreList from '@/components/Icons/StoreList';

const grapeProducts = [
  {
    id: 1,
    name: 'Red Globe Grapes',
    price: '$3.89 - $5.99',
    weight: '2 lbs',
    image: require('@/assets/images/produce/redGrapes.png'),
    backgroundColor: '#FFE1E1',
    stores: "Walmart,Walmart,Target"
  },
  {
    id: 2,
    name: 'Green Seedless Grapes',
    price: '$4.29 - $6.49',
    weight: '3 lbs',
    image: require('@/assets/images/produce/greenGrapes.png'),
    backgroundColor: '#E8FFE1',
    stores: "Walmart,Trader Joes,Target"
  },
  {
    id: 3,
    name: 'Concord Grapes',
    price: '$5.29 - $7.99',
    weight: '2.5 lbs',
    image: require('@/assets/images/produce/blueGrapes.png'),
    backgroundColor: '#E1EEFF',
    stores: "Trader Joes,Safeway,target"
  },
  {
    id: 4,
    name: 'Cotton Candy Grapes',
    price: '$6.59 - $8.99',
    weight: '2 lbs',
    image: require('@/assets/images/produce/cottonGrapes.png'),
    backgroundColor: '#FFE1FF',
    stores: "Target,Safeway,target"
  },
  {
    id: 5,
    name: 'Moon Drop Grapes',
    price: '$5.49 - $7.49',
    weight: '1.5 lbs',
    image: require('@/assets/images/produce/moonGrapes.png'),
    backgroundColor: '#FFF1E1',
    stores: "Trader Joes,Walmart,target, "
  },
  {
    id: 6,
    name: 'Champagne Grapes',
    price: '$7.99 - $9.99',
    weight: '1 lb',
    image: require('@/assets/images/produce/champGrapes.png'),
    backgroundColor: '#E1FFF1',
    stores: "Trader Joes,Safeway,target"
  },
];

export default function Search() {
  const { searchText } = useLocalSearchParams();
  const router = useRouter();
  const [newSearchText, setNewSearchText] = useState(searchText);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleSearch = () => {
    router.replace({ pathname: "/(tabs)/subPages/search", params: { searchText: newSearchText} });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.searchContainer}>
          <SearchBar
            onFilterPress={() => console.log('Filter pressed')}
            onTextUpdate={setNewSearchText}
            onSubmit={handleSearch}
            onFocus={() => console.log('Search focused')}
            onFocusStop={() => console.log('Search focus stopped')}
          />
          <Text style={styles.text}>
            Showing results for "<Text style={styles.highlight}>{searchText}</Text>"
          </Text>
        </View>
        <View style={styles.productsContainer}>
          {grapeProducts.map((item) => (
            <TouchableOpacity
            onPress={() => router.push({ pathname: "/(tabs)/subPages/productDetailsMock"})}
            key={item.id}
            style={styles.productItem}
            >
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
              <Text style={styles.productWeight}>{item.weight}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
              <View style={styles.storeIconsContainer}>
                <StoreList stores={commaToList(item.stores)}/>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function commaToList(values: string): string[] {
  return values.split(',').map(item => item.trim());
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  backArrow: {
    width: 24,
    height: 24,
  },
  searchContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  text: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
  },
  highlight: {
    color: 'blue',
    fontWeight: 'bold',
  },
  productsContainer: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 8,
    marginTop: 18,
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