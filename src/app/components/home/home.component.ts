import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { User } from 'src/app/modules/auth/services/firebase/user';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User | undefined;

  constructor(
    private firebase: AuthService
  ) { }

  ngOnInit(): void {
    this.firebase.user.subscribe((data: User | undefined) => {
      // if (!data)
      //   this.user = undefined;
      // else
      //   this.user = data;

        this.user = data;
    });
  }

}
