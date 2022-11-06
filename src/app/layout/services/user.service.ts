import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from '../../pages/auth/services/auth.service';
import {User} from '../../pages/auth/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId = this.authService.getUid();

  constructor(public afs: AngularFirestore,
              private authService: AuthService) {
  }

  getUser(): Observable<User> {
    return this.afs.doc<User>(`users/${this.userId}`).snapshotChanges().pipe(map(item => item.payload.data()));
  }
}
