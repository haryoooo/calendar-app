import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD2RZSP6Kv6dQRxQv9yTvDXTLScMJDEFx4",
  authDomain: "event-calendar-projects.firebaseapp.com",
  databaseURL: "https://event-calendar-projects-default-rtdb.firebaseio.com",
  projectId: "event-calendar-projects",
  storageBucket: "event-calendar-projects.appspot.com",
  messagingSenderId: "849301382542",
  appId: "1:849301382542:web:3f0f9af342b82e35f670df",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
