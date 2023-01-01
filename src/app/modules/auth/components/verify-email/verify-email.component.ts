import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/firebase/firebase.service';
import { User } from '../../services/firebase/user';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private firebase: AuthService, private router:Router) { }

  ngOnInit() {
    this.firebase.user.subscribe((user: User|undefined) => {
      if (user && user.emailVerified) {
        this.router.navigate(['dashboard']);
      }
    })
  }

}
