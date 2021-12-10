import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import MapPreview from "../components/MapPreview";
import Colors from "../constants/Colors";

const PlaceDetailScreen = (props) => {
  const placeId = props.navigation.getParam("placeId");
  const place = useSelector((state) => state.places.places).find(
    (place) => place.id === placeId
  );

  const selectedLocation = { lat: place.lat, lng: place.lng };

  const showMapHandler = () => {
    props.navigation.navigate("Map", {
      readOnly: true,
      initialLocation: selectedLocation,
    });
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <MapPreview
          onPress={showMapHandler}
          style={styles.mapPreview}
          location={selectedLocation}
        />
      </View>
    </ScrollView>
  );
};

PlaceDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle").title,
  };
};

export default PlaceDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "35%",
    minHeight: 300,
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
