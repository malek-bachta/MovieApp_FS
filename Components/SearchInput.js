import React, { useState } from "react";
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import Iconn from "react-native-vector-icons/Feather";

function SearchInput({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  function addToDoHandler() {
    onSearch(searchText);
  }

  function search(text) {
    onSearch(text);
    setSearchText(text);
  }

  function handleSearchButtonPress() {
    onSearch(searchText);
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Search"
        style={styles.input}
        value={searchText}
        onChangeText={(text) => search(text)}
        onSubmitEditing={handleSearchButtonPress}
        returnKeyType="search"
      />
      <TouchableOpacity style={styles.addButton} onPress={addToDoHandler}>
        <Iconn name="search" size={20} color="#EE9B37" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#494037", 
    borderRadius: 8, 
    margin: 15,
    alignItems: "center", 
  },
  input: {
    flex: 1, 
    height: 40, 
    paddingHorizontal: 10, 
    fontSize: 16, 
    color: "#FFF", 
  },
  addButton: {
    width: 40, 
    height: 40, 
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8, 
  },
});

export default SearchInput;
