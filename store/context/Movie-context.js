import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const MovieContext = createContext({
  movies: [],
  addMovie: () => {},
  deleteMovie: () => {},
  fetchAddedMovies: () => {},
  editMovie: () => {},
});

function MovieContextProvider({ children }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    retrieveMovies();
  }, []);

  const retrieveMovies = async () => {
    try {
      const storedMovies = await AsyncStorage.getItem("movies");
      if (storedMovies) {
        setMovies(JSON.parse(storedMovies));
      }
    } catch (error) {
      console.log("Error retrieving movies:", error);
    }
  };

  const addMovie = async (movie) => {
    try {
      const existingMovie = movies.find(
        (m) => m.title.toLowerCase() === movie.title.toLowerCase()
      );
      if (existingMovie) {
        alert("Movie already exists!");
        return;
      }
      const updatedMovies = [...movies, movie];
      setMovies(updatedMovies);
      await AsyncStorage.setItem("movies", JSON.stringify(updatedMovies));
    } catch (error) {
      console.log("Error saving movie:", error);
    }
  };

  const deleteMovie = async (movie) => {
    try {
      const storedMovies = await AsyncStorage.getItem("movies");
      let updatedMovies = [];
      if (storedMovies) {
        updatedMovies = JSON.parse(storedMovies);
        updatedMovies = updatedMovies.filter((item) => item.id !== movie.id);
        await AsyncStorage.setItem("movies", JSON.stringify(updatedMovies));
        setMovies(updatedMovies); // Update state
      }
    } catch (error) {
      console.log("Error deleting movie:", error);
    }
  };

  const editMovie = async (editedMovie) => {
    console.log("Editing movie with ID:", editedMovie.id);
    try {
      const updatedMovies = movies.map((movie) =>
        movie.id === editedMovie.id ? editedMovie : movie
      );
      setMovies(updatedMovies);
      await AsyncStorage.setItem("movies", JSON.stringify(updatedMovies));
    } catch (error) {
      console.log("Error editing movie:", error);
    }
  };
  

  const value = {
    initialMovies: movies,
    addMovie: addMovie,
    deleteMovie: deleteMovie,
    fetchAddedMovies: retrieveMovies,
    editMovie: editMovie,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}

export default MovieContextProvider;
