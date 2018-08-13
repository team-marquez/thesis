import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyCad4hrHzVOFkhUtX5-ZqCP-LxSugwf2Is",
  authDomain: "letsgoto-aa933.firebaseapp.com",
  databaseURL: "https://letsgoto-aa933.firebaseio.com",
  projectId: "letsgoto-aa933",
  storageBucket: "letsgoto-aa933.appspot.com",
  messagingSenderId: "785647478431"
};
firebase.initializeApp(config);

export default firebase
