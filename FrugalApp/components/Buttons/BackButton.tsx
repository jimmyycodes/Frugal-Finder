import { View, StyleSheet, Pressable } from 'react-native'
import { BackArrowIcon } from '../Icons/SvgHandler'
import React from 'react'
import { useRouter } from 'expo-router'

type ButtonProps = {
  onPress?: () => void;
};

export default function BackButton({ onPress }: ButtonProps) {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Pressable onPress={
        onPress ? onPress : () => { router.back() }
      }>
        <BackArrowIcon />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})