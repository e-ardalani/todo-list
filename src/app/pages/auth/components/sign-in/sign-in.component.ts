import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormGroup, Validators, FormControl} from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private router: Router,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.createForm();

  }

  createForm() {
    this.formGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  signUp() {
    this.router.navigate(['auth/sign-up']);
  }

  singInByUserNameAndPassword(form) {
    this.authService.SignIn(form.email, form.password).finally();
  }

  singInByGoogleAuth() {
    this.authService.GoogleAuth().then(() => {
      this.router.navigate(['dashboard']);
    });
  }

}
