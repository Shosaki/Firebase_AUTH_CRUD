import {initializeApp} from 'firebase/app';
// import {getAnalytics} from 'firebase/analytics';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBC4PXHw4JT-fds_kiWug7phnWHAE-dRFo',
  authDomain: 'to-do-crud-482e7.firebaseapp.com',
  projectId: 'to-do-crud-482e7',
  storageBucket: 'to-do-crud-482e7.appspot.com',
  messagingSenderId: '1063407945550',
  appId: '1:1063407945550:web:a53daac844ac65845c801f',
  measurementId: 'G-LKRSEWW7M8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
