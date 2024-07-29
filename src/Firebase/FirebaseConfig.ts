import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBqza36GVkDqgrImuJVexNobUf7ssjYLYs",
  authDomain: "gonearbyshops.firebaseapp.com",
  projectId: "gonearbyshops",
  storageBucket: "gonearbyshops.appspot.com",
  messagingSenderId: "681748419855",
  appId: "1:681748419855:web:5b01e8218ede9426921a7a",
  measurementId: "G-ZCXWZ0B4M7",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
