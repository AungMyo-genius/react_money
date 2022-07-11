import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCxOeDJPWS2xoLr0dkNFQ_bNNUVvs1xdsU",
  authDomain: "mymoney-34ccf.firebaseapp.com",
  projectId: "mymoney-34ccf",
  storageBucket: "mymoney-34ccf.appspot.com",
  messagingSenderId: "155272763568",
  appId: "1:155272763568:web:6240617da929bbc6a58375"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }