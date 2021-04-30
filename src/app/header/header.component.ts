import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
/* Création d'une variable boolean */
  isAuth: boolean;

  /* On injecte le service authService dans constructor */
  constructor(private authService: AuthService) { }

  /* appel d'une méthode qui s'applique quand l'état de connexion de l'utilisateur change */
  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

/* Méthode de déconnexion */
  onSignOut() {
    this.authService.signOutUser();
  }
}
