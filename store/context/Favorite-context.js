import React, { createContext, useState } from "react";

export const FavoriteContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

function FavoriteContextProvider({ children }) {
  const [favoriteMovieIds, setFavoriteMovieIds] = useState([]);


  function addFavorite(id) {
    setFavoriteMovieIds((currentFavIds) => [...currentFavIds, id]);
  }

  function removeFavorite(id) {
    setFavoriteMovieIds((currentFavIds) =>
      currentFavIds.filter((movieId) => movieId !== id)
    );
  }

  const value = {
    ids: favoriteMovieIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

export default FavoriteContextProvider;
