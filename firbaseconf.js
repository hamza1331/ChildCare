import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCBQHfWAlqEUbSYWnv553qtRKhaBRt0e64",
    authDomain: "cppshema.firebaseapp.com",
    databaseURL: "https://cppshema.firebaseio.com",
    projectId: "cppshema",
    storageBucket: "cppshema.appspot.com",
    messagingSenderId: "201425550292"
  };
  firebase.initializeApp(config);

export default firebase