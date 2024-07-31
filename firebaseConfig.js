import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth,getAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FB_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FB_AUTH_DOMAIN,
    databaseURL: process.env.EXPO_PUBLIC_FB_URL,
    projectId: process.env.EXPO_PUBLIC_FB_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSEGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FB_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Auth with custom persistence settings
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, db, auth };
