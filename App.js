import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import Details from "./Screens/Details";
import MyTabs from "./Screens/TabNavigator";
import { StatusBar } from "react-native";
import FavoriteContextProvider from "./store/context/Favorite-context";
import MovieContextProvider from "./store/context/Movie-context";
import EditMovies from "./Screens/EditMovies";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar style="dark" />
      <MovieContextProvider>
        <FavoriteContextProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="MainTab"
                component={MyTabs}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Details"
                component={Details}
                options={{
                  presentation: "modal",
                  title: "",
                  headerShown: false,
                  headerTintColor: "#EE9B37",

                  headerStyle: {
                    backgroundColor: "#1F1F1F",
                  },
                }}
              />
              <Stack.Screen
                name="Edit"
                component={EditMovies}
                options={{
                  presentation: "modal",
                  title: "",
                  // headerShown: false,
                  headerTintColor: "#EE9B37",

                  headerStyle: {
                    backgroundColor: "#1F1F1F",
                  },
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </FavoriteContextProvider>
      </MovieContextProvider>
    </>
  );
}
