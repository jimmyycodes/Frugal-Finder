import React, { FC, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { GasIcon } from '../Icons/SvgHandler';

interface TwoFieldComponentProps {

  /**
   * Optional title text
   */
  title?: string;

  /**
   * Optional icon component
   */
  icon?: string;

  /**
   * Called when either field updates;
   * receives a field name ("fieldOne" or "fieldTwo") and the new value
   */
  onUpdate: (fieldName: 'fieldOne' | 'fieldTwo', value: string) => void;
}

const TwoFieldComponent: FC<TwoFieldComponentProps> = ({ title, icon, onUpdate }) => {
  const [fieldOneValue, setFieldOneValue] = useState('');
  const [fieldTwoValue, setFieldTwoValue] = useState('');

  const handleFieldOneChange = (value: string) => {
    setFieldOneValue(value);
    onUpdate('fieldOne', value);
  };

  const handleFieldTwoChange = (value: string) => {
    setFieldTwoValue(value);
    onUpdate('fieldTwo', value);
  };

  return (
    <View style={styles.container}>

      {/* Optional Icon */}

      {/* Optional Title */}
      {title ? <Text style={styles.title}>{title}</Text> : null}

      {/* First Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Example Field One"
        value={fieldOneValue}
        onChangeText={handleFieldOneChange}
      />

      {/* Second Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Example Field Two"
        value={fieldTwoValue}
        onChangeText={handleFieldTwoChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});

export default TwoFieldComponent;
