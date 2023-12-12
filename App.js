import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/ui/IconButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import { useEffect, useState } from "react";
import { init } from "./utils/db";
import AppLoading from "expo-app-loading";
import PlaceDetail from "./screens/PlaceDetail";

const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState();

  const dbHandler = async () => {
    try {
      await init();
      setDbInitialized(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dbHandler();
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  color={tintColor}
                  size={24}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add a new place",
              headerBackTitle: "Back",
            }}
          />
          <Screen name="Map" component={Map} />
          <Screen
            name="PlaceDetails"
            component={PlaceDetail}
            options={{ title: "Loading Place..." }}
          />
        </Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
