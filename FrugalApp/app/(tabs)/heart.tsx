import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Heart() {
  return (
    <View style={styles.container}>
      <Text>Coming Soon</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})