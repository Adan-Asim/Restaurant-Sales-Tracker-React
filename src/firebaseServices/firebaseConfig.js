import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDSiYHL_y4SKZcAhxquB5FoYr-oectaW7A",
  authDomain: "restaurant-sales-tracker.firebaseapp.com",
  projectId: "restaurant-sales-tracker",
  storageBucket: "restaurant-sales-tracker.appspot.com",
  messagingSenderId: "609746817821",
  appId: "1:609746817821:web:f261ece609ebee151347f4",
};

const app = initializeApp(firebaseConfig);
const firebaseDb = getDatabase(app);

export default firebaseDb;
