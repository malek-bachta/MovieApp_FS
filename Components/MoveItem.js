import React, { useContext } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { FavoriteContext } from "../store/context/Favorite-context";

function MovieItem({ poster, title, onPress, rating, id }) {
  const favoriteMoviesCtx = useContext(FavoriteContext);
  const movieIsFavorite = favoriteMoviesCtx.ids.includes(id);

  return (
    <View style={styles.gridItemContainer}>
      <TouchableOpacity onPress={onPress} style={styles.gridItem}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `${poster}`,
            }}
            style={styles.Image}
            onError={(error) => console.log("Image loading error:", error)}
          />
          <View style={styles.rating}>
            <Icon name="star" size={20} color="#CCB802" />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  gridItemContainer: {
    paddingHorizontal: 5,
    flex: 0.5,
    maxWidth: "50%",
  },



  imageContainer: {
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
  },

  Image: {
    maxWidth: "100%",
    minWidth: 160,
    height: 190,
    margin: 10,
    resizeMode: "contain",
    borderColor: "#EE9B37",
    borderWidth: 1,
    borderRadius: 20,
  },

  title: {
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    height: 40, 
    overflow: "hidden",
  },

  rating: {
    position: "absolute",
    top: 20,
    left: 120,
    flexDirection: "row",
  },
  ratingText: {
    fontSize: 18,
    color: "#CCB802",
    textAlign: "center",
    fontWeight: "bold",
  },

  iconContainer: {
    position: "absolute",
    top: 245,
    right: 80,
    backgroundColor: "#2E271E",
    borderRadius: 50,
    padding: 5,
    borderColor: "#EE9B37",
    borderWidth: 1,
    elevation: 3,
  },
});

export default MovieItem;
