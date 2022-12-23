import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { User } from 'src/app/modules/auth/services/firebase/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user!: User;

  constructor(
    private userService: FirebaseService,
    private router: Router
    ) { }

  ngOnInit() {
    this.userService.user.subscribe((data:User|undefined) => {
      if (data) {

        if (!data.roles) {
          this.router.navigate(['auth', 'add-user-data']);
        }

        this.user = data;
      }
    });
  }

}
