import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/database';
import { Subject } from 'rxjs';
import { Book } from '../models/Book.model';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class BooksService {
  /* On crée l'array et le sujet */
  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  /* Ajout d'un constructor pour appeler getBooks() au démarrage */
  constructor() {
    this.getBooks()
  }

  /* Méthode émettant le bookSubject */
  emitBooks() {
    this.booksSubject.next(this.books);
  }

  /* Méthode enregistrant la liste dans la BDD */
  saveBooks() {
    firebase
      .database()
      .ref('/books')
      .set(this.books);
  }

  /* Méthode récupérant la liste des livres */
  getBooks() {
    firebase
      .database()
      .ref('/books')
      .on('value', (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      }
      );
  }

  /* Méthode récupérant UN livre selon son id */
  getSingleBook(id: number) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref('/books/' + id)
        .once('value')
        .then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  /* Méthode de création d'un livre */
  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  /* Méthode de suppression d'un livre */
  removeBook(book: Book) {
    //? Suppr. de la photo en cas de suppr. du livre----------
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimée!');
        },
        (error) => {
          console.log('Fichier non trouvé : ' + error);
        }
      );
    }
    //-------------------------------------------------------
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        return bookEl === book;
        }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  /* Méthode asynchrone de téléchargement */
  uploadFile(file: File) {
    return new Promise((resolve, reject) => {
      const almostUniqueFileName = Date.now().toString()
      const upload = firebase
        .storage()
        .ref()
        .child('images/' + almostUniqueFileName + file.name)
        .put(file)
      upload.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log('Chargement…')
        },
        error => {
          console.log('Erreur de chargement ! : ' + error)
          reject()
        },
        () => {
          resolve(upload.snapshot.ref.getDownloadURL())
        }
      )
    })
  }
}
