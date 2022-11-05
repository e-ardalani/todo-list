import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../pages/auth/models/user';
import {AuthService} from '../../../pages/auth/services/auth.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$: Observable<User>;


  constructor(private userService: UserService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.user$ = this.userService.getUser();
  }

  signOut() {
    this.authService.SignOut().finally();
  }

}
