import { Dimensions, FlatList, StyleSheet } from "react-native";

import MovieItem from "./MoveItem";
import { SafeAreaView } from "react-native-safe-area-context";

function FavoriteMovieList({ navigation, item }) {
  const windowWidth = Dimensions.get("window").width;

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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={item}
        keyExtractor={(item) => item.id.toString()}
        numColumns={Math.floor(windowWidth / 180)} 
        contentContainerStyle={styles.listContainer}
        renderItem={RenderMovieItem}
      />
    </SafeAreaView>
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
export default FavoriteMovieList;
