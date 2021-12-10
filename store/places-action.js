import * as FileSystem from "expo-file-system";
import ENV from "../Env";
import { fetchPlaces, insertPlace } from "../helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const { lat, lng } = location;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${ENV.googleApiKey}`
    );

    if (!response.ok) {
      throw new Error("Something Went Wrong!");
    }

    const resData = await response.json();

    if (!resData.results) {
      throw new Error("Something Went Wrong!");
    }

    const address = resData.results[0].formatted_address;

    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertPlace(title, newPath, address, lat, lng);
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title,
          image: newPath,
          address,
          coords: { lat, lng },
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const places = await fetchPlaces();
      // console.log(places.rows?._array || [], "places");
      dispatch({ type: SET_PLACES, places: places.rows?._array || [] });
    } catch (err) {
      throw err;
    }
  };
};
