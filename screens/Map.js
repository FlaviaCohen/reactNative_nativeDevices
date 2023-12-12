import MapView, { Marker } from "react-native-maps";
import { Alert, StyleSheet } from "react-native";
import { useLayoutEffect, useState, useCallback } from "react";
import IconButton from "../components/ui/IconButton";

const Map = ({ navigation, route }) => {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudDelta: 0.0922,
    longitudeDelta: 0.421,
  };

  const selectLocationHandler = (event) => {
    if (!initialLocation) {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      setSelectedLocation({
        latitude,
        longitude,
      });
    }
  };

  const saveLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked",
        "You have to pick a location (by tapping on the map) first!"
      );
      return;
    }
    navigation.navigate("AddPlace", selectedLocation);
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (!initialLocation) {
      navigation.setOptions({
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="save"
            size={24}
            color={tintColor}
            onPress={saveLocationHandler}
          />
        ),
      });
    }
  }, [navigation, saveLocationHandler, initialLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker title="Picked Location" coordinate={selectedLocation} />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
