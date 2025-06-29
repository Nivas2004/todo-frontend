// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAqCIfFkbOtK231PZs3nGIEbwmuyEcv0p8",
  authDomain: "todo-app-f2a3a.firebaseapp.com",
  projectId: "todo-app-f2a3a",
  storageBucket: "todo-app-f2a3a.appspot.com",
  messagingSenderId: "157533083368",
  appId: "1:157533083368:web:13351fd38ade3d1c731b5d"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Export login function
export const loginWithGoogle = () => signInWithPopup(auth, provider);

// ✅ Export auth objects
export { auth, provider };
