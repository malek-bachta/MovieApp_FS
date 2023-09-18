import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoriteS from "./FavoriteS";
import Home from "./Home";
import Icon from "react-native-vector-icons/FontAwesome";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#EE9B37",
        tabBarInactiveTintColor: "#60544C",
        tabBarStyle: {
          backgroundColor: "#1F1F1F",
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteS}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" color={color} size={size} />
          ),
          headerTitle: "Favorite Movies",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#1F1F1F",
          },
          headerTintColor: "#fff",
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
