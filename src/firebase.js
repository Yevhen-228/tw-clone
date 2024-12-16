// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Ваша конфигурация Firebase. Замените на ваши данные из консоли Firebase.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация Firestore
const db = getFirestore(app);

// Экспортируем db, чтобы использовать в других компонентах
export { db };