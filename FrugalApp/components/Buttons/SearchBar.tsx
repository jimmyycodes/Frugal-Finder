import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native';
import { SearchIcon } from '../Icons/SvgHandler';

type searchButtonProps = {
    onFilterPress: () => void;
    onTextUpdate: (text: string) => void;
}

export default function SearchBar({onFilterPress, onTextUpdate}: searchButtonProps) {
    return (
      <View style={styles.container}>
        <SearchIcon />
        <TextInput placeholder='Search keywords...' />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F4F5F9',
    borderRadius: 10,
    margin: 10,
  },
});