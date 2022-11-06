import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  formGroup: FormGroup;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }


  forgotPassword(form) {
    this.authService.ForgotPassword(form.email).finally();

  }

}
