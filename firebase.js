import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { toast } from 'react-toastify';

const firebaseConfig = {
  apiKey: 'AIzaSyBiyltQpPhWlUpjOswWeRKZYM7MbiB7oxU',
  authDomain: 'netflix-clone-c6aeb.firebaseapp.com',
  projectId: 'netflix-clone-c6aeb',
  storageBucket: 'netflix-clone-c6aeb.firebasestorage.app',
  messagingSenderId: '246917035312',
  appId: '1:246917035312:web:216dfa8b174c1dacb184f5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'user'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
    toast.success('You Sign up')
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1]);
    
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success('You Sign in')
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
    
  }
};

const logout = () => {
  signOut(auth);
  toast.success('You Logged Out')
};

export { auth, db, login, signup, logout };
