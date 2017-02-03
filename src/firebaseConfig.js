import firebase from 'firebase';
const firebaseConfig = {
	apiKey: "AIzaSyBurUC0VGV1mTPEgIz5meRdV0tRykL9S_8",
	authDomain: "myplace-d196a.firebaseapp.com",
	databaseURL: "https://myplace-d196a.firebaseio.com",
	storageBucket: "myplace-d196a.appspot.com",
	messagingSenderId: "382384489529"
};

const FbApp = firebase.initializeApp(firebaseConfig);
module.exports = FbApp.database();
