import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../pages/auth/models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-info-dialog',
  templateUrl: './user-info-dialog.component.html',
  styleUrls: ['./user-info-dialog.component.scss']
})
export class UserInfoDialogComponent implements OnInit {
  user$: Observable<User>;
  isDarkMode: boolean;
  lang: string;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUserInfo();

  }

  getTheme(event) {
    this.isDarkMode = event;
  }

  getLang(event) {
    this.lang = event;
    console.log(typeof this.lang);
  }

  getUserInfo() {
    this.user$ = this.userService.getUser();
  }

}
