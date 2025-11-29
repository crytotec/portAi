import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAeMB4dozxu8HQF3xf_48lvNYQQSEnBPAc",
  authDomain: "porfolio-e62d4.firebaseapp.com",
  projectId: "porfolio-e62d4",
  storageBucket: "porfolio-e62d4.firebasestorage.app",
  messagingSenderId: "841616458755",
  appId: "1:841616458755:web:f647b24580f510eb15ba36"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
