import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  /* On injecte le service Router */
  constructor(private router: Router) { }

  /* Méthode CanActivate qui autorise l'accès aux routes pour l'utilisateur */
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              resolve(true);
            } else {
              this.router.navigate(['/auth', 'signin']);
              resolve(false);
            }
          }
        );
      }
    );
  }
}
