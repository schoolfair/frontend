import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formData: FormGroup;

  loggingIn = false;

  constructor(public firebase: FirebaseService) {
    this.formData = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required])
    });

   }

  ngOnInit() {

  }

  private get email () {
    return this.formData.controls['email'].value;
  }

  private get password() {
    return this.formData.controls['password'].value;
  }

  login() {
    this.loggingIn = true;
    this.firebase.SignIn(this.email, this.password);
  }

}
