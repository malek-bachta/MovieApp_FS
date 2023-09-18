import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import MovieItem from "./MoveItem";
import SearchInput from "./SearchInput";
import { useNavigation } from "@react-navigation/native";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?page=1&api_key=afa1011726231b0cbda17f170b31cbed"
        );
        const json = await response.json();
        setMovies(json.results);
        setFilteredMovies(json.results);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovies();
  }, []);

  const handleSearch = (searchText) => {
    const filtered = movies.filter((movie) =>
      movie.original_title.toLowerCase().includes(searchText.toLowerCase())
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
        title={item.original_title}
        onPress={handlePress}
        rating={item.vote_average}
        id={item.id}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SearchInput onSearch={handleSearch} />
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={Math.floor(windowWidth / 180)} 
        contentContainerStyle={styles.listContainer}
        renderItem={RenderMovieItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Image: {
    width: 180,
    height: 190,
    margin: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
});

export default MovieList;
