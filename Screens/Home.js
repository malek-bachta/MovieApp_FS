import React from "react";
import { StyleSheet, View } from "react-native";
import MovieList from "../Components/MovieList";
import { SafeAreaView } from "react-native-safe-area-context";
import FavoriteContextProvider from "../store/context/Favorite-context";

function Home() {
  return (
    <>
      <FavoriteContextProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.homeContainer}>
            <MovieList />
          </View>
        </SafeAreaView>
      </FavoriteContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F1F",
  },
  homeContainer: {
    flex: 1,
  },
});

export default Home;
