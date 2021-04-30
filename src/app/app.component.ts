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
      apiKey: "AIzaSyA1Xg50gtVR6-ZzKblk6be37DPXvrzfwdg",
      authDomain: "bookshelves-2ff1e.firebaseapp.com",
      projectId: "bookshelves-2ff1e",
      storageBucket: "bookshelves-2ff1e.appspot.com",
      messagingSenderId: "770749707719",
      appId: "1:770749707719:web:5cfed6cf4cae0af352d5e2",
      measurementId: "G-41YJ2C3138"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
   }
}
