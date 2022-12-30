import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentDataModel, EmployerDataModel, UserDataModel } from 'src/app/modules/auth/models/user-data';
import { FirebaseService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { User } from 'src/app/modules/auth/services/firebase/user';
import { UserdataService } from 'src/app/modules/auth/services/userdata/userdata.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user!: User;
  userData!: any;

  constructor(
    private userService: FirebaseService,
    private userDataService: UserdataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.user.subscribe((user: User|undefined) => {
      if (user) {
        this.user = user;

        this.userDataService.GetById(user.uid).subscribe((data: any) => {
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

  navigateToUpdateProfile() {
    this.router.navigate(['user', 'update']);
  }

}
