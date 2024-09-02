import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAA7H7_y9ehQF64NzzqhpodVGIpuXuO2SA",
  authDomain: "hms-github-2e686.firebaseapp.com",
  projectId: "hms-github-2e686",
  storageBucket: "hms-github-2e686.appspot.com",
  messagingSenderId: "589494350394",
  appId: "1:589494350394:web:e567bdff5578f14a3bbb03",
  measurementId: "G-E8RDR0ZZ9R",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };