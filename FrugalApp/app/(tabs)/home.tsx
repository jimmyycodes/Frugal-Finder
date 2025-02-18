import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Home screen component for the "Heart" tab
export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Heart tab!</Text>
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