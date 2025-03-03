// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDHm96fALzK3iUIALVLGXN0amM0_Uzj07Q",
    authDomain: "ecommerceapp-cdd5a.firebaseapp.com",
    projectId: "ecommerceapp-cdd5a",
    storageBucket: "ecommerceapp-cdd5a.firebasestorage.app",
    messagingSenderId: "372829345113",
    appId: "1:372829345113:web:7e7f04db08012231096848"
  };

const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };