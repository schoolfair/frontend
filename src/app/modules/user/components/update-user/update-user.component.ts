import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployerDataModel, StudentDataModel, UserDataModel } from 'src/app/modules/auth/components/add-user-data/user-data';
import { FirebaseService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { User } from 'src/app/modules/auth/services/firebase/user';
import { UserdataService } from 'src/app/modules/auth/services/userdata/userdata.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  user!: User;
  userData!: UserDataModel;

  constructor(
    private userService: FirebaseService,
    private userDataService: UserdataService) { }

  ngOnInit() {
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
    })

  }

}
