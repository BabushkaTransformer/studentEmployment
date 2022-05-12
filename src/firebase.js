import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAqytdsZgH7StYKakYjwz3wjvkGgG09-Ao",
  authDomain: "diploma-240f3.firebaseapp.com",
  projectId: "diploma-240f3",
  storageBucket: "diploma-240f3.appspot.com",
  messagingSenderId: "300700265628",
  appId: "1:300700265628:web:7286307093bc54d1a11159",
  measurementId: "G-873PFTNE4W"
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(firebase);

export { firebase, db, auth, storage };