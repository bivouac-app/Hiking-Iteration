import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy2sA10CQ_Z7Zg5xhqII9dItxg4bmxCSs",
  authDomain: "hiking-app-thing.firebaseapp.com",
  projectId: "hiking-app-thing",
  storageBucket: "hiking-app-thing.appspot.com",
  messagingSenderId: "334688339533",
  appId: "1:334688339533:web:0885a6089daa2d4e9e7e04",
  measurementId: "G-487517BWHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


