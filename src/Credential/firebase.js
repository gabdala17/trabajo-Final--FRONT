import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export const app = firebase.initializeApp({
  apiKey: "AIzaSyBEc2ILEygMxTaAyHDyFuvtTUbEOyaSDMM",
  authDomain: "medicine-app-role.firebaseapp.com",
  projectId: "medicine-app-role",
  storageBucket: "gs://medicine-app-role.appspot.com",
  messagingSenderId: "868110344968",
  appId: "1:868110344968:web:0c5ec03fa043f61ce6c2bd",
});
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyBEc2ILEygMxTaAyHDyFuvtTUbEOyaSDMM",
//   authDomain: "medicine-app-role.firebaseapp.com",
//   projectId: "medicine-app-role",
//   storageBucket: "gs://medicine-app-role.appspot.com",
//   messagingSenderId: "868110344968",
//   appId: "1:868110344968:web:0c5ec03fa043f61ce6c2bd",
// };

// const app = initializeApp(firebaseConfig);

// const auth = getAuth();

// export { app, auth };