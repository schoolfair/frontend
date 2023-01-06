import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, UntypedFormArray, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { first, Observable, Subscription, take } from 'rxjs';
import { EmployerDataModel, StudentDataModel, UserDataModel } from 'src/app/modules/auth/models/user-data';
import { AuthService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { User } from 'src/app/modules/auth/services/firebase/user';
import { UserdataService } from 'src/app/modules/auth/services/userdata/userdata.service';
import { skills } from 'src/app/modules/shared/models/skills';
import { Tags } from 'src/app/modules/shared/models/tags';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit, OnDestroy {

  user!: User;
  userData!: any;

  group!: FormGroup;

  tags = Tags
  skills = skills

  sub!: Subscription


  constructor(
    private userService: AuthService,
    private userDataService: UserdataService,
    private router: Router) { }

  ngOnInit() {
    this.sub = this.userService.user.subscribe((user: User|undefined) => {
      if (user) {
        this.user = user;

        this.userDataService.GetById(user.uid).pipe(first()).subscribe((data: any) => {
          if (data) {
            if (user.roles?.student) {
              this.userData = data as StudentDataModel;
              this.group = new FormGroup({
                firstName: new FormControl(this.userData.firstName),
                lastName: new FormControl(this.userData.lastName),
                preferredName: new FormControl(this.userData.preferredName),

                zipcode: new FormControl(this.userData.zipcode),

                interests: new FormControl(this.userData.interests),
                skills: new FormControl(this.userData.skills),

                website: new FormControl(this.userData.website)
              })
            }
            else if (user.roles?.employer) {
              this.userData = data as EmployerDataModel

              this.group = new FormGroup({
                firstName: new FormControl(this.userData.firstName),
                lastName: new FormControl(this.userData.lastName),
                preferredName: new FormControl(this.userData.preferredName),

                zipcode: new FormControl(this.userData.zipcode),

              })
            }
          }
        });
      }
    })

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get interestsControl() {
    return this.group.get('interests') as UntypedFormControl;
  }

  get skillsControl() {
    return this.group.get('skills') as UntypedFormControl;
  }

  submit() {
    if (this.user.roles?.student) {
      this.userDataService.Update(this.user.uid, this.group.value as StudentDataModel)
    }
    else if (this.user.roles?.employer) {
      this.userDataService.Update(this.user.uid, this.group.value as EmployerDataModel)
    }

    this.router.navigate(['/user']);
  }

}
