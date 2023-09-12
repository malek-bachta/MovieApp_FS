import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import MovieItem from "./MoveItem";
import SearchInput from "./SearchInput";
import { useNavigation } from "@react-navigation/native";
import { MovieContext } from "../store/context/Movie-context";
import Icon from "react-native-vector-icons/Entypo";

function MovieList({ addedMovie }) {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const { initialMovies, fetchAddedMovies } = useContext(MovieContext);

  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    setMovies(initialMovies);
    setFilteredMovies(initialMovies);
  }, [initialMovies]);

  const handleSearch = (searchText) => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const RenderMovieItem = ({ item }) => {
    const handlePress = () => {
      navigation.navigate("Details", {
        item,
      });
    };

    return (
      <MovieItem
        poster={item.poster_path}
        title={item.title}
        onPress={handlePress}
        rating={item.vote_average}
        id={item.id}
      />
    );
  };

  const handleAddMovie = () => {
    navigation.navigate("AddMovies");
  };

  return (
    <View style={styles.container}>
      <SearchInput onSearch={handleSearch} />
      {filteredMovies.length === 0 ? (
         (
          <View style={styles.containerM}>
            <Text style={styles.text}>There is no movies yet.</Text>
            <TouchableOpacity onPress={handleAddMovie}>
              <Icon
                name="add-to-list"
                size={100}
                color="#EE9B37"
                style={{ alignSelf: "center" }}
              />
            </TouchableOpacity>
          </View>
        )
      ) : (
        <FlatList
          data={filteredMovies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={Math.floor(windowWidth / 180)}
          contentContainerStyle={styles.listContainer}
          renderItem={RenderMovieItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
  },
  containerM: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
});

export default MovieList;
