import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Iconn from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MovieContext } from "../store/context/Movie-context";
import ConfirmPopUp from "../Components/ConfirmPopup";

function Details({ route }) {
  const [modalVisibleDelete, setModalVisibleDelete] = useState(false); 
  const [modalDeleteMessage, setModalDeleteMessage] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);
  const { deleteMovie } = useContext(MovieContext);

  const navigation = useNavigation();

  const {
    id,
    poster_path,
    language,
    title,
    description,
    popularity,
    release_date,
    vote_average,
    vote_count,
    run_time,
    genre,
  } = route.params.item;

  useEffect(() => {
    (async () => {
      try {
        const storedMovies = await AsyncStorage.getItem("FavoriteMovies");
        if (storedMovies) {
          const parsedMovies = JSON.parse(storedMovies);
          const isExist = parsedMovies.find((movie) => movie.id === id);
          if (isExist) {
            setIsFavourite(true);
          }
        }
      } catch (error) {
        console.log("Error retrieving data:", error);
      }
    })();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const toggleModalDelete = () => {
    setModalDeleteMessage("Meyaked ?");
    setModalVisibleDelete(!modalVisibleDelete);
  };
  const closeDeleteModal = () => {
    setModalVisibleDelete(false);
  };

  const ChangeFavoriteHandler = async () => {
    if (isFavourite) {
      setIsFavourite(false);
      try {
        const favouritList = await AsyncStorage.getItem("FavoriteMovies");
        const favouritListParsed = JSON.parse(favouritList);
        const filtered = favouritListParsed.filter((movie) => movie.id !== id);
        await AsyncStorage.setItem("FavoriteMovies", JSON.stringify(filtered));
      } catch (error) {
        console.log("Error storing favorite movies:", error);
      }
    } else {
      setIsFavourite(true);
      try {
        const favouritList = await AsyncStorage.getItem("FavoriteMovies");
        const favouritListParsed = JSON.parse(favouritList) || [];
        console.log({ favouritListParsed: favouritListParsed.length });
        favouritListParsed.push(route.params.item);
        await AsyncStorage.setItem(
          "FavoriteMovies",
          JSON.stringify(favouritListParsed)
        );
      } catch (error) {
        console.log("Error storing favorite movies:", error);
      }
    }

  };

  const handleDelete = async () => {
    try {
      await deleteMovie(route.params.item);

      setIsFavourite(false);
      try {
        const favouritList = await AsyncStorage.getItem("FavoriteMovies");
        const favouritListParsed = JSON.parse(favouritList);
        const filtered = favouritListParsed.filter((movie) => movie.id !== id);
        await AsyncStorage.setItem("FavoriteMovies", JSON.stringify(filtered));
      } catch (error) {
        console.log("Error storing favorite movies:", error);
      }
      navigation.navigate("Home");
    } catch (error) {
      console.log("Error deleting movie");
    }
  };

  const handleEdit = async () => {
   try {
      navigation.navigate("Edit", {
        item: route.params.item,
      });
    } catch (error) {
      console.log("Error editing movie");
    } 
  };

  return (
    <>
      {/* <View style={styles.container}> */}
      {/* <SafeAreaView style={styles.container}> */}
      <ImageBackground
        source={{
          uri: `${poster_path}`,
        }}
        style={styles.backgroundImage}
        resizeMode="stretch"
      >
        <View style={{ flexDirection: "row", margin: 20, flex: 1 }}>
          <TouchableOpacity style={styles.arrowBack} onPress={handleGoBack}>
            <Icon name="long-arrow-left" size={30} color="#EE9B37" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favorite}>
            <Icon
              name={isFavourite ? "heart" : "heart-o"}
              size={40}
              color="#E04E1B"
              onPress={ChangeFavoriteHandler}
            />
          </TouchableOpacity>

        
        </View>
        <View style={styles.detailContainer}>
          <ScrollView>
            <View style={styles.rating}>
              <Icon name="star" size={15} color="#CCB802" />
              <Text style={styles.ratingText}>{vote_average}/10</Text>
              <Text style={styles.vote_count}> ( {vote_count} reviews )</Text>

            </View>

            <Text style={styles.title}>{title} </Text>
            <ScrollView horizontal style={{ flex: 1, flexDirection: "row" }}>
              <View style={styles.release_date}>
                <Text style={styles.other}>{release_date}</Text>
              </View>
              <View style={styles.release_date}>
                <Text style={styles.other}>{run_time} min</Text>
              </View>
              <View style={styles.release_date}>
                <Text style={styles.other}>{language}</Text>
              </View>
              {/* <View style={styles.release_date}>
              {genre.split(', ').map((g) => (
                <Text key={g} style={styles.other}>
                  {g}
                </Text>
              ))}
                </View> */}
            </ScrollView>
            <View style={{ flex: 7, marginTop: 10, fontSize: 14 }}>
              <Text style={styles.description}>{description}</Text>
            </View>
            <View style={styles.deleteMovie}>
              <TouchableOpacity onPress={toggleModalDelete}>
                <Iconn name="trash" size={40} color="#E04E1B"  />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleEdit}>
                <Icon name="edit" size={40} color="#E04E1B" />
              </TouchableOpacity>
              <ConfirmPopUp 
                isVisible={modalVisibleDelete}
                message={modalDeleteMessage}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
                close={closeDeleteModal}
              />
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
      {/* </SafeAreaView> */}
      {/* </View> */}
    </>
  );
}

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F1F",
  },
  backgroundImage: {
    flex: 1,
  },
  detailContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  rating: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 15,
    color: "#CCB802",
    textAlign: "center",
    fontWeight: "bold",
  },
  vote_count: {
    color: "#fff",
    fontSize: 12,
  },
  description: {
    color: "#fff",
    fontSize: 13,
  },

  release_date: {
    fontSize: 15,
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 50,
    backgroundColor: "rgba(128, 128, 128, 0.5)",
    height: 30,
    marginRight: 10,
    width: 90, 
  },

  other: {
    color: "#fff",
    textAlign: "center",
  },

  arrowBack: {
    flex: 1,
  },
  favorite: {
    flex: 1/6,
  },
  deleteMovie: {
    flex: 1,
    marginTop: 20,
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "space-between",

    
  }
});
