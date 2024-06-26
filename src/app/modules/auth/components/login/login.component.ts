import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/firebase/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  formData: UntypedFormGroup;

  loggingIn = false;

  constructor(public firebase: AuthService) {
    this.formData = new UntypedFormGroup({
      'email': new UntypedFormControl('', [Validators.required, Validators.email]),
      'password': new UntypedFormControl('', [Validators.required])
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
    this.firebase.SignIn(this.email, this.password).then(() => {
      this.loggingIn = false;
    });
  }

}
