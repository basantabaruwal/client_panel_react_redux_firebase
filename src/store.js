// firebase & firestore
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import { createStore, combineReducers, compose } from "redux";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore"; // <- needed if using firestore
// Our custom Reducers
// notify reducer
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

// Config from the firebase console
const firebaseConfig = {
// copy config of your firebase app from firebase and paste here
};

// react-redux firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Init the firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
const firestore = firebase.firestore(); // needed if using firestore

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  // needed if using firestore
  firestore: firestoreReducer,
  // our custom reducers
  notification: notifyReducer,
  settings: settingsReducer
});

// set some defaults
export const defaultSettings = {
  allowRegistration: false,
  disableBalanceOnAdd: true,
  disableBalanceOnEdit: false
};

// check for the default values in localstorage
if (localStorage.getItem("settings") == null) {
  // localStorage can not hold javascript object
  // localStorage can only hold string
  // so change it to string using JSON
  const defaultSettingsJSON = JSON.stringify(defaultSettings);
  // set to local storage
  localStorage.setItem("settings", defaultSettingsJSON);
}

// the initial state
const initialState = {
  settings: JSON.parse(localStorage.getItem("settings"))
};

// Create store with combineReducers and initial state
const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // needed if using firestore
  // for user profile using firestore
  userProfile: "users",
  useFirestoreForProfile: true
};

export default store;
