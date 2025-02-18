import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Bag screen component for the "Bag" tab
export default function Bag() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Bag tab!</Text>
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
    fontWeight: 'bold',
  },
});