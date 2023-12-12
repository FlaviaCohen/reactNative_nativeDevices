import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlineButton from "../components/ui/OutlineButton";
import { Colors } from "../constants/colors";
import { useState, useEffect } from "react";
import { getPlace } from "../utils/db";

const PlaceDetail = ({ route, navigation }) => {
  const [place, setPlace] = useState();
  const { id } = route.params;

  const showOnMapHandler = () => {
    navigation.navigate("Map", {
      initialLat: place.location.latitude,
      initialLng: place.location.longitude,
    });
  };

  const placeHandler = async () => {
    const place = await getPlace(id);
    setPlace(place);
    navigation.setOptions({ title: place.title });
  };

  useEffect(() => {
    placeHandler();
  }, [id]);

  if (!place) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <OutlineButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlineButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetail;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
