import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { User } from 'src/app/modules/auth/services/firebase/user';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User | undefined;

  constructor(
    private firebase: FirebaseService
  ) { }

  ngOnInit(): void {
    this.firebase.user.subscribe((data: User | undefined) => {
      this.user = data;
    });
  }

}
