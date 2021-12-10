import React, { useEffect } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CustomHeaderButton from "../components/HeaderButton";
import PlaceItem from "../components/PlaceItem";
import { loadPlaces } from "../store/places-action";

const PlacesListScreen = (props) => {
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPlaces());
  }, [dispatch]);
  console.log(places.array);
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id.toString()}
      renderItem={(itemData) => (
        <PlaceItem
          title={itemData.item.title}
          image={itemData.item.imageUri}
          address={itemData.item.address}
          onSelect={() =>
            props.navigation.navigate("PlaceDetail", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            })
          }
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Places",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Add Place"
            iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
            onPress={() => {
              navData.navigation.navigate("NewPlace");
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

export default PlacesListScreen;

const styles = StyleSheet.create({});
