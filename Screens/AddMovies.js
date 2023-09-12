import { StyleSheet, Text, View } from "react-native";
import MovieForm from "../Components/ManageMovies/MovieForm";

function AddMovies() {
  return (
    <View style={styles.container}>
      <MovieForm />
    </View>
  );
}
export default AddMovies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "",
  },
  homeContainer: {
    flex: 1,
  },
});
