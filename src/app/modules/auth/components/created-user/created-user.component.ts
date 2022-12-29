import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { User } from '../../services/firebase/user';

@Component({
  templateUrl: './created-user.component.html',
  styleUrls: ['./created-user.component.scss']
})
export class CreatedUserComponent implements OnInit {

  constructor(
    private firebase: FirebaseService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.firebase.user.subscribe((data?: User) => {
      if (data) {
        //this.router.navigate(['']);
      }

    })
  }

}
