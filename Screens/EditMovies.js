import React from "react";
import { View, StyleSheet } from "react-native";
import MovieForm from "../Components/ManageMovies/MovieForm";

function EditMovies({ route }) {
  const { item } = route.params;
  console.log("Editing movie with item:", item);

  return (
    <View style={styles.container}>
      <MovieForm editMode={true} movieToEdit={item} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F1F",
  },
});

export default EditMovies;
