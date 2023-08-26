import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig ={
    apiKey: "AIzaSyBzOgisQP7xfS_F6F20GBXSvPrmq5Wq2Kw",
    authDomain: "learncs-chat.firebaseapp.com",
    projectId: "learncs-chat",
    storageBucket: "learncs-chat.appspot.com",
    messagingSenderId: "826277161756",
    appId: "1:826277161756:web:2a3bf76916ddd76b6768d9"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()

export { db };