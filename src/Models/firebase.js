import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADg1ndEWZgfOMSsG0_ZGRA064v___KzAA",
  authDomain: "mini-core-web.firebaseapp.com",
  projectId: "mini-core-web",
  storageBucket: "mini-core-web.appspot.com",
  messagingSenderId: "41952861038",
  appId: "1:41952861038:web:0afb48c9c7d790ce9e3f7f",
  measurementId: "G-KPEMPTPJF9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("app: ", app);
// Get a Firestore instance
const db = getFirestore();




export { db, collection, getDocs  };
