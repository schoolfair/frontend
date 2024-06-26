import { ApplicationRef, Injectable, NgZone } from '@angular/core';
import { Roles, User } from './user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { UserDataModel } from '../../models/user-data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { L } from '@angular/cdk/keycodes';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  googleProvider = new auth.GoogleAuthProvider();

  private _user: Subject<User| undefined> = new BehaviorSubject<User|undefined>(undefined);
  public user: Observable<User | undefined> = this._user.asObservable();

  public redirectUrl?: string;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    //public ngZone: NgZone, // NgZone service to remove outside scope warning
  ) {



    /* Saving user data when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {

      if (user) {
        this.afs.doc<User>(`users/${user.uid}`).valueChanges().subscribe((data: User|undefined) => {

          this._user.next(data);

          if (this.redirectUrl) {
            this.router.navigate([this.redirectUrl]);
          }

        })
      }
      else {
        this._user.next(undefined);
      }

    });
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        //this.SetUserData(result.user);
        //this.router.navigate(['auth', 'verify-email']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['auth', 'verify-email-address']);
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }



  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(this.googleProvider)
  }

  // Auth logic to run auth providers
  async AuthLogin(provider: any) {
    return await this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        //this.SetUserData(result.user);
        this.router.navigate([''])
      })
      .catch((error) => {
        window.alert(error);
      });
  }


  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    return userRef.set(userData, {
      merge: true,
    });

  }



  // Sign out
  async SignOut() {
    this.redirectUrl = undefined;

    await this.afAuth.signOut();



    window.location.reload();

  }

  async DeleteAccount() {
    let user = await this.afAuth.currentUser
    return user?.delete();
  }

}
