import {initializeApp} from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import {getAuth} from "firebase/auth";
import {getDatabase, ref} from "firebase/database";

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDatabase = getDatabase()
export const dbRef = ref(firebaseDatabase);