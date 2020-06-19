import firebase from 'firebase'

const config = {
  apiKey: process.env.GOOGLE_API_KEY,
  authDomain: `${process.env.FIREB_APP_NICKNAME}.firebaseapp.com`,
  databaseURL: `https://${process.env.FIREB_APP_NICKNAME}.firebaseio.com`,
  projectId: process.env.FIREB_APP_NICKNAME,
  storageBucket: `${process.env.FIREB_APP_NICKNAME}.appspot.com`,
  messagingSenderId: process.env.FIREB_MSG_SENDER_ID,
  appId: process.env.FIREB_APP_ID,
};

const fire = firebase.initializeApp(config);

export default fire;