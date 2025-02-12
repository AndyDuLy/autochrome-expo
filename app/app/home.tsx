import React, { useState } from "react";
import { View, Button, Image, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { styles } from "./home.styles";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const downloadImage = async () => {
    if (image) {
      const downloadUri = image;
      const fileUri = FileSystem.documentDirectory + "downloaded_image.jpg";
      const response = await fetch(downloadUri);
      const blob = await response.blob();
      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        const base64data = fileReader.result;

        if (base64data && typeof base64data === "string") {
          FileSystem.writeAsStringAsync(fileUri, base64data, {
            encoding: FileSystem.EncodingType.Base64,
          })
            .then(() => {
              alert("Image downloaded successfully!");
            })
            .catch((error) => {
              alert("Error downloading image: " + error.message);
            });
        }
      };
      fileReader.readAsDataURL(blob);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Home</Text>

      <Button title="Upload Image" onPress={pickImage} />

      {image && (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <Button title="Download Image" onPress={downloadImage} />
        </>
      )}
    </View>
  );
}
