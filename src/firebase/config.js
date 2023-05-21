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

// const firebaseConfig = {
//   apiKey: 'AIzaSyC3KboF-8X9APFgDRP77DAB0qxZ9ur3JZc',
//   authDomain: 'eliie-2c65f.firebaseapp.com',
//   projectId: 'eliie-2c65f',
//   storageBucket: 'eliie-2c65f.appspot.com',
//   messagingSenderId: '831735184482',
//   appId: '1:831735184482:web:ca4a5db7a46bed4250253b',
//   measurementId: 'G-BYHNXVFS5W',
// };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
