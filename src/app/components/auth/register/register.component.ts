import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData: FormGroup
  loading = false;

  constructor(private firebase: FirebaseService) {
    this.formData = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }

  ngOnInit() {

  }

  private get email () {
    return this.formData.controls['email'].value;
  }

  private get password() {
    return this.formData.controls['password'].value;
  }

  register() {
    this.loading = true;
    this.firebase.SignUp(this.email, this.password);
  }

}
