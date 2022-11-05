import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {


  constructor(private router: Router,
              public authService: AuthService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

  }


  signIn() {

  }

  signUp(){
    this.router.navigate(['auth/sign-up']);
  }

}
