import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';

export default function Search() {

  const { searchText } = useLocalSearchParams();
  const navigation  = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Showing results for "{searchText}"</Text>
      <Button title="Back" onPress={() => navigation.back()} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});