import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { SearchIcon } from "../Icons/SvgHandler";
import { SettingsIcon } from "../Icons/SvgHandler";
import { useState } from "react";

/**
 * Ideal setup:
 *
 * On focus, the page will change to the results page
 *
 * On onFocusStop, the page will change back to the home page if the search bar
 * is empty
 *
 * The search bar should persist across pages
 *
 * On submit, the results page will fill
 */

// For now the Discover more section cannont enter text unless we want the parent
// component to handle the search bar state (use a hook)

type searchButtonProps = {
  onFilterPress: () => void; // When the user presses the filter button
  onTextUpdate: (text: string) => void; // to return text to the parent component
  onSubmit: () => void; // When the user presses enter on the keyboard
  onFocus: () => void; // When the user clicks on the search bar and is entering text
  onFocusStop: () => void; // When the user clicks away from the search bar
};

export default function SearchBar({
  onFilterPress,
  onTextUpdate,
  onSubmit,
  onFocus,
  onFocusStop,
}: searchButtonProps) {
  const [text, setText] = useState("");

  const onTextupdateLocal = (text: string) => {
    setText(text);
    onTextUpdate(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchIcon}>
        <SearchIcon />
      </View>
      <TextInput
        style={styles.text}
        placeholder="Search keywords..."
        onChangeText={onTextupdateLocal}
        onSubmitEditing={onSubmit}
        onFocus={onFocus}
        onBlur={onFocusStop}
        value={text}
      />
      <View style={styles.settingsIcon}>
        <Pressable onPress={onFilterPress}>
          <SettingsIcon />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F4F5F9",
    borderRadius: 10,
    margin: 10,
    width: "90%",
    height: 50,
  },
  text: {
    // TODO: Why does the text glitch on input
    textAlign: "left",
    width: "80%",
  },
  searchIcon: {
    marginRight: 20,
    marginLeft: 10,
  },
  settingsIcon: {
    marginLeft: "auto",
    right: 10,
  },
});
