import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import FavoriteMovieList from "../Components/FavoriteList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";


function FavoriteS() {
  const [movies, setMovies] = useState([]);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchFavoriteMovies() {
      try {
        const storedFavoriteMovies = await AsyncStorage.getItem(
          "FavoriteMovies"
        );
        if (storedFavoriteMovies) {
          const parsedFavoriteMovies = JSON.parse(storedFavoriteMovies);
          console.log({ parsedFavoriteMovies });
          setMovies(parsedFavoriteMovies);
        }
      } catch (error) {
        console.log("Error fetching favorite movies:", error);
      }
    }
    fetchFavoriteMovies();
  }, [isFocused]);


  if (movies.length === 0) {
    return (
      <View style={styles.container}>
        <Icon 
          name="emoji-sad"
          size={100}
          color="#EE9B37"
          style={{ alignSelf: "center" }}
        />
        <Text style={styles.text}>You have no favorite movies yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FavoriteMovieList item={movies} navigation={navigation} />
    </View>
  );
}

export default FavoriteS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F1F",
    justifyContent: "center",
  },

  text: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
});
