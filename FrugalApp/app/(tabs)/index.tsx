import { Image, StyleSheet, Platform, Button } from "react-native";
import { View, Text, TextInput } from "react-native";
import { useState } from "react";

export default function HomeScreen() {
  const [text, setText] = useState("");


  return (
    <View style={styles.container}>
      <TextInput
      style={styles.input}
      placeholder="Write here"
      value={text}
      onChangeText={setText}
      />

      <View style={styles.button}>
        <Button title="save" onPress={() => save(text)} />
      </View>

      <View style={styles.button}>
        <Button title="load" />
      </View>
    </View>
  );
}

function save(text: string): void {
  console.log("Save: ", text);
}

const styles = StyleSheet.create({
  textPlain: {
    color: "white",
    fontSize: 18,
    marginTop: 20,
  },

  button: {
    margin: 10,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  input: {
    width: "80%",
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    color: "black",
    borderRadius: 5,
  },
});
