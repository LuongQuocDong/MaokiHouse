// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

// Auth is the only Firebase client service still used directly in the browser.
// RTDB reads/writes and file uploads now go through the backend API (see src/services).
const auth = getAuth(app);

export { auth };
