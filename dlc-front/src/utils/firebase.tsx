
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeUsRJLwVlC5dga3Xc2jnGcyq2ZYZEeY4",
  authDomain: "dlc-motors.firebaseapp.com",
  databaseURL: "https://dlc-motors-default-rtdb.firebaseio.com",
  projectId: "dlc-motors",
  storageBucket: "dlc-motors.appspot.com",
  messagingSenderId: "100317160888",
  appId: "1:100317160888:web:9470cefb31157067131b4d",
  measurementId: "G-7J2BMCMDKZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);