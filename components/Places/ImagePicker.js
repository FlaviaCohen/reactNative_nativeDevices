import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import OutlineButton from "../ui/outlineButton";

const ImagePicker = () => {
  const [imageUri, setImageUri] = useState("");

  const [status, requestPermission] = useCameraPermissions();

  // Just for IOs
  const verifyPermissions = async () => {
    if (status.status === PermissionStatus.DENIED) {
      return Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app"
      );
    }

    const permissionResponse = await requestPermission();
    return permissionResponse.granted; // true or false
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setImageUri(image.assets[0].uri);
  };

  return (
    <View>
      <View style={styles.preview}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text>No image taken yet.</Text>
        )}
      </View>
      <OutlineButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlineButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  preview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
