import React, { useState } from "react";
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Octicons";

function SearchInput({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  function addToDoHandler() {
    onSearch(searchText);
  }

  function search(text)
  {
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
        onChangeText={(text)=>search(text)}
        
        onSubmitEditing={handleSearchButtonPress} 
        returnKeyType="search" 
      />
      <TouchableOpacity style={styles.addButton} onPress={addToDoHandler}>
        <Icon name="search" size={20} color="#EE9B37" />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  inputContainer: {
      flexDirection: "row",
    backgroundColor: "#000",
    borderRadius: 20,
    margin:10,
  },
  input: {
    flex: 4,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingRight: 5,
    color: "#fff",
  },
  addButton: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
});

export default SearchInput;
