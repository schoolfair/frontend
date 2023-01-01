import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/firebase/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData: UntypedFormGroup
  loading = false;

  constructor(private firebase: AuthService) {
    this.formData = new UntypedFormGroup({
      'email': new UntypedFormControl('', [Validators.required, Validators.email]),
      'password': new UntypedFormControl('', [Validators.required, Validators.minLength(8)]),
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
