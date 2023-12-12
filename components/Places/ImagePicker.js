import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import OutlineButton from "../ui/OutlineButton";
import { verifyPermissions } from "../../utils/veryfyPermissions";

const ImagePicker = ({ onTakeImage }) => {
  const [imageUri, setImageUri] = useState("");

  const [status, requestPermission] = useCameraPermissions();

  const takeImageHandler = async () => {
    // only for iOS
    const hasPermission = await verifyPermissions(
      status,
      PermissionStatus,
      requestPermission,
      Alert,
      "Insufficient Permissions!",
      "You need to grant camera permissions to use this app"
    );
    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setImageUri(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
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
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
