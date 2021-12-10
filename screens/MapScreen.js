import { Platform } from "@unimodules/react-native-adapter";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colors";

const MapScreen = (props) => {
  const location = props.navigation.getParam("initialLocation");
  const readOnly = props.navigation.getParam("readOnly");

  const [selectedLocation, setSelectedLocation] = useState(location);
  const mapRegion = {
    latitude: selectedLocation?.lat || 37.78,
    longitude: selectedLocation?.lng || -122.43,
    longitudeDelta: 0.0922,
    latitudeDelta: 0.0421,
  };

  const selectLocationHandler = (e) => {
    if (readOnly) {
      return;
    }
    const { latitude: lat, longitude: lng } = e.nativeEvent.coordinate;
    setSelectedLocation({
      lat,
      lng,
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (readOnly) {
      return;
    }
    if (!selectedLocation) {
      Alert.alert(
        "Can't Save",
        "You need To Select a location In Order to save",
        [{ text: "Okay" }]
      );
    }
    if (selectedLocation) {
      ToastAndroid.show("Saved!", 2000);
      props.navigation.navigate("NewPlace", {
        pickedLocation: selectedLocation,
      });
    }
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);

  let markedCoordinates;

  if (selectedLocation) {
    const { lat: latitude, lng: longitude } = selectedLocation;
    markedCoordinates = {
      latitude,
      longitude,
    };
    console.log(location, selectedLocation, markedCoordinates);
  }

  return (
    <MapView
      style={{ flex: 1 }}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker title="Picked Location" coordinate={markedCoordinates}></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
  const saveFn = navData.navigation.getParam("saveLocation");
  const readOnly = navData.navigation.getParam("readOnly");
  if (readOnly) return {};
  return {
    headerRight: () => (
      <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    ),
  };
};

export default MapScreen;

const styles = StyleSheet.create({
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS !== "android" ? Colors.primary : "white",
  },
});
