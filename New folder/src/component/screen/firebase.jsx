
import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot, collection, addDoc, getDocs, where, query, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL ,  listAll} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD4s_PX_XEcOPE7fQ3YTQfJ2PXXIkSPBS4",
  authDomain: "pie-in-the-sky-c6a6c.firebaseapp.com",
  projectId: "pie-in-the-sky-c6a6c",
  storageBucket: "pie-in-the-sky-c6a6c.appspot.com",
  messagingSenderId: "503659266191",
  appId: "1:503659266191:web:7837741664784fe08c30fa",
  measurementId: "G-FLQ81JTDSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const itemsRef = collection(db, 'Items');

const storage = getStorage()

export {
  itemsRef,
  addDoc,
  onSnapshot,
  getDocs,
  where,
  query,
  doc,
  getDoc,
  ref,
  storage,
  uploadBytes,
  listAll,
  getDownloadURL,  
}