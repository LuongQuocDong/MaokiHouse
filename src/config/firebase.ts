// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLQQ-CUanRs9z_neNCffjXUF6744R9I_Q",
  authDomain: "maokihouse.firebaseapp.com",
  projectId: "maokihouse",
  storageBucket: "maokihouse.appspot.com",
  messagingSenderId: "734356901042",
  appId: "1:734356901042:web:89b68741bd230a3a1bcdab",
  measurementId: "G-GDHQSM9908",
  databaseURL: "https://maokihouse-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services with region and custom domain if needed
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);
const db = getFirestore(app);

// Export Firebase services
export { auth, database, storage, db };