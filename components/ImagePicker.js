import React, { useState } from "react";
import { Button, StyleSheet, Text, View, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState();
  const verifyPermission = async () => {
    // const result = await Permissions.askAsync(Permissions.CAMERA);
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permission",
        "You need To Grant Camera Permissions to use This App",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };
  const pickImageHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    // const image = await ImagePicker.launchImageLibraryAsync({
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 0.7,
    });
    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };
  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No Image Picked Yet</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Pick an Image"
        color={Colors.primary}
        onPress={pickImageHandler}
      />
    </View>
  );
};

export default ImgPicker;

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
