import { Text, StyleSheet, View, Pressable } from 'react-native';
import { useState } from 'react';

type CatButtonProps ={
    title: string;
    svg: React.ReactNode;
    onPress: () => void;
}

const size = 120;
const baseColor = '#FFFBFB'
const ColorSelected = '#9FF98D'

export default function CatButton({title, svg, onPress}: CatButtonProps) {
    const [selected, setSelected] = useState(false);
    const [color, setColor] = useState(baseColor);

    const onPressLocal = () => {
      setSelected(!selected)
      setColor(selected ? baseColor : ColorSelected)
      onPress()
    }

    return (
      <Pressable onPress={onPressLocal} style={[styles.container, {backgroundColor: color}]}>
        <View style={styles.svgContainer}>
          {svg}
        </View>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    padding: 7,
    width: size,
    height: size,
  },
  svgContainer: {
    margin: 'auto',
  },
  text: {
    textAlign: 'center',
    color: '#868889',
  },
});