import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /* Création d'un constructor avec les informations dans le script de firebase */
  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyDMFG4vnk2H_n0GGsxaBsM-W6wbxMPHC6s",
      authDomain: "bookshelves-ad300.firebaseapp.com",
      databaseURL: 'https://bookshelves-ad300-default-rtdb.europe-west1.firebasedatabase.app/',
      projectId: "bookshelves-ad300",
      storageBucket: "bookshelves-ad300.appspot.com",
      messagingSenderId: "838225922032",
      appId: "1:838225922032:web:c4c4c74ca1cdbbb8d73f35",
      measurementId: "G-6V409LF9J6"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
