import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, Subscription, take } from 'rxjs';
import { StudentDataModel, EmployerDataModel, UserDataModel } from 'src/app/modules/auth/models/user-data';
import { AuthService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { User } from 'src/app/modules/auth/services/firebase/user';
import { UserdataService } from 'src/app/modules/auth/services/userdata/userdata.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  user!: User;
  userData!: any;

  subscription!: Subscription;

  constructor(
    private userService: AuthService,
    private userDataService: UserdataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.userService.user.subscribe((user: User|undefined) => {

      if (user) {
        this.user = user;

        this.userDataService.GetById(user.uid).pipe(first()).subscribe((data: any) => {
          if (data) {
            if (user.roles?.student)
              this.userData = data as StudentDataModel;
            else if (user.roles?.employer) {
              this.userData = data as EmployerDataModel
            }
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  navigateToUpdateProfile() {
    this.router.navigate(['user', 'update']);
  }

}
