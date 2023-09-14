import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

function Input({ label, style, textInputConfig }) {

    const inputStyles = [styles.input]

    if(textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMultiline)
    }

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput style={styles.textInput} placeholderTextColor="#888" {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
    flex: 0.46,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: "#EE9B37", 
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 7,
    padding: 10,
    color: "white", 
    backgroundColor: "#494037", 
  },
  inputMultiline: {
    height: 3000,
    textAlignVertical: "top",
    },
});

export default Input;
