import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import PlacesNavigator from "./navigation/PlacesNavigator";
import placesReducer from "./store/places-reducer";
import { init } from "./helpers/db";

init()
  .then((res) => {
    console.log("Initialized database");
  })
  .catch((err) => {
    console.log("initializing db failed");
    console.log(err);
  });

const rootReducer = combineReducers({
  places: placesReducer,
});

const compose =
  process.env.NODE_ENV === "development" ? composeWithDevTools : "";

const store = createStore(rootReducer, compose(applyMiddleware(ReduxThunk)));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
