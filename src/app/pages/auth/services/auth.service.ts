import {Injectable, NgZone} from '@angular/core';
import {User} from '../models/user';
import * as auth from 'firebase/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ApiService} from '../../../shared/services/api.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userId: any; // Save logged in user data
  userData;
  emailVerified;


  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        this.userId = user.uid;
        this.emailVerified = user.emailVerified;
        localStorage.setItem('uid', this.userId);
        localStorage.setItem('emailVerified', this.emailVerified);
      } else {
        localStorage.setItem('uid', 'null');
      }
    });

  }

  getUid() {
    return localStorage.getItem('uid');
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    this.apiService.start();
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          this.apiService.complete();
          if (user) {
            this.router.navigate(['dashboard']);
            localStorage.setItem('dark-mode', 'false');

          }
        });
      })
      .catch((error) => {
        this.apiService.complete();
        this.toastr.error(error.message);

      });
  }

  // Sign up with email/password
  SignUp(firstName: string, lastName: string, email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user, firstName, lastName);
        this.router.navigate(['auth/verify-email-address']);

      })
      .catch((error) => {
        this.toastr.error(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['auth/verify-email-address']);
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.toastr.error('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        this.toastr.error(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    // tslint:disable-next-line:no-non-null-assertion
    const user = localStorage.getItem('uid')!;
    const emailVerified = JSON.parse(localStorage.getItem('emailVerified')!);
    return user !== null && emailVerified === true;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          this.router.navigate(['dashboard']);
          localStorage.setItem('dark-mode', 'false');
        }
      });
    }).catch((error) => {
      this.toastr.error(error);
    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {

        let firstName = '';
        let lastName = '';
        try {
          firstName = result.user.displayName.split(' ')[0];
          lastName = result.user.displayName.replace(firstName, '');
        } catch (e) {
          firstName = result.user.displayName;
        }
        this.SetUserData(result.user, firstName, lastName);
      })
      .catch((error) => {
        this.toastr.error(error.message);
      });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any, firstName?: string, lastName?: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    if (firstName) {
      userData.firstName = firstName;
    }
    if (lastName) {
      userData.lastName = lastName;
    }

    return userRef.set(userData, {
      merge: true,
    });
  }


  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.clear();
      this.router.navigate(['auth/sign-in']);
    });
  }
}
