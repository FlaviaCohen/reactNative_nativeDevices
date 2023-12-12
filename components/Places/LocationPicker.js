import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import OutlineButton from "../ui/OutlineButton";
import { Colors } from "../../constants/colors";
import { verifyPermissions } from "../../utils/veryfyPermissions";
import { getAddress, getMapPreview } from "../../utils/location";

const LocationPicker = ({ onPickLocation }) => {
  const [pickedLocation, setPickedLocation] = useState();

  const { navigate } = useNavigation();
  const { params } = useRoute();

  const [status, requestPermission] = useForegroundPermissions();

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions(
      status,
      PermissionStatus,
      requestPermission,
      Alert,
      "Insufficient Permissions!",
      "You need to grant location permissions to use this app"
    );
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();

    const { latitude, longitude } = location.coords;

    setPickedLocation({
      latitude,
      longitude,
    });
  };

  const pickOnMapHandler = () => {
    navigate("Map");
  };

  const locationHandler = async () => {
    if (params) {
      const address = await getAddress(params);
      setPickedLocation({ ...params , address });
    }
  };

  useEffect(() => {
    locationHandler();
  }, [params]);

  useEffect(() => {
    onPickLocation(pickedLocation);
  }, [pickedLocation, onPickLocation]);

  return (
    <View>
      <View style={styles.mapPreview}>
        {pickedLocation ? (
          <Image
            style={styles.image}
            source={{ uri: getMapPreview(pickedLocation) }}
          />
        ) : (
          <Text>No location picked yet.</Text>
        )}
      </View>
      <View style={styles.actions}>
        <OutlineButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlineButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
