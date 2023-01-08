import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { User } from 'src/app/modules/auth/services/firebase/user';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User | undefined;

  constructor(
    private firebase: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.firebase.user.subscribe((data: User | undefined) => {
        if (data && !data.roles) {
          this.router.navigate(['auth', 'add-user-data'])
        }
        this.user = data;
    });
  }

}
