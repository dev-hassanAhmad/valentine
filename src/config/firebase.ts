// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlofwLTSWBIlD4orTOpiIGLvM4sFuhu_Y",
  authDomain: "valentine-f2bda.firebaseapp.com",
  databaseURL: "https://valentine-f2bda-default-rtdb.firebaseio.com",
  projectId: "valentine-f2bda",
  storageBucket: "valentine-f2bda.firebasestorage.app",
  messagingSenderId: "22013889623",
  appId: "1:22013889623:web:0eee77f6c6823093372712"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

export default app;
