import React, { FC, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { GasIcon } from '../Icons/SvgHandler';

interface TwoFieldProps {
// I guess were using an interface for this one. has some benifits
  /**
   * Optional title text
   */
  title?: string;

  placeholder1?: string;

  placeholder2?: string;

  icon?: boolean;

  /**
   * Called when either field updates;
   * receives a field name ("fieldOne" or "fieldTwo") and the new value
   */
  onUpdate: (fieldName: 'fieldOne' | 'fieldTwo', value: string) => void;
}

const TwoFields: FC<TwoFieldProps> = ({ title, icon, onUpdate, placeholder1, placeholder2 }) => {
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
      {icon ? <GasIcon style={styles.image} /> : null}

      {/* Optional Title */}
      {title ? <Text style={styles.title}>{title}</Text> : null}

      <View style={styles.inputContainer}>
        {/* First Input Field */}
        <TextInput
          style={styles.input}
          placeholder={placeholder1 ? placeholder1 : 'Example'}
          value={fieldOneValue}
          onChangeText={handleFieldOneChange}
        />

        {/* Second Input Field */}
        <TextInput
          style={styles.input}
          placeholder={placeholder2 ? placeholder2 : 'Example'}
          value={fieldTwoValue}
          onChangeText={handleFieldTwoChange}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '90%',
    height: 60,
    borderRadius: 5,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 8,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    marginRight: 8,
    marginLeft: 10,
    fontFamily: 'Poppins',
    color: '#868889',
  },
  input: {
    marginHorizontal: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    backgroundColor: '#F4F5F9',
    width: 120,
    height: 45,
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    margin: 'auto',
  },
});

export default TwoFields;
