import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/firebase/firebase.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent {

  constructor(private auth: AuthService) { }

  loading: boolean = false;
  emailSent: boolean = false;

  sendVerificationEmail() {
    this.loading = true;

    this.auth.SendVerificationMail().then(() => {
      this.loading = false;
      this.emailSent = true;
    });
  }

}
