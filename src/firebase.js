import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBzkDbp_QZzbGW18R5qTy_CAmYtlt4b7Fg",
  authDomain: "genrator-data-allocation.firebaseapp.com",
  projectId: "genrator-data-allocation",
  storageBucket: "genrator-data-allocation.firebasestorage.app",
  messagingSenderId: "65264782473",
  appId: "1:65264782473:web:b2947589b0244dc2d28a58",
  measurementId: "G-QJ67QR0PGR"
};

let app;

export const getFirebaseApp = () => {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  return app;
};

export const auth = getAuth(getFirebaseApp());
export const db = getFirestore(getFirebaseApp());
export const analytics = getAnalytics(getFirebaseApp());
export default getFirebaseApp(); 