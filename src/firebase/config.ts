// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBFrAOx7pfCynCs_413Y-0N_0RCP8bQbVM',
  authDomain: 'ellieswebsite-67088.firebaseapp.com',
  projectId: 'ellieswebsite-67088',
  storageBucket: 'ellieswebsite-67088.appspot.com',
  messagingSenderId: '358387397912',
  appId: '1:358387397912:web:c71996272705e026d81a6d',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
