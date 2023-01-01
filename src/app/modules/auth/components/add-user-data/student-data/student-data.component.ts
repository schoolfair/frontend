import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FirebaseService } from '../../../services/firebase/firebase.service';
import { User } from '../../../services/firebase/user';
import { UserdataService } from '../../../services/userdata/userdata.service';
import { StudentDataModel } from '../../../models/user-data';

@Component({
  selector: 'app-student-data',
  templateUrl: './student-data.component.html',
  styleUrls: ['./student-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentDataComponent implements OnInit {

  studentFormGroup: UntypedFormGroup;

  interests = [];

  @Input() userDataFormGroup!: UntypedFormGroup;

  constructor(
    private firebase: FirebaseService,
    private userdata: UserdataService,
    private router: Router
    ) {
      this.studentFormGroup = new UntypedFormGroup({

        description: new UntypedFormControl('', [Validators.required]),

        // student specific

        grade: new UntypedFormControl('', [Validators.required]), // regex
        school: new UntypedFormControl('', [Validators.required]),
      })
    }

  ngOnInit(): void {
  }


  submitStudent() {


    this.firebase.user.subscribe((user: User |undefined) => {
      if (!user) { console.error("User is undefined."); }
      else {

        let student: StudentDataModel = {

          uid: user.uid,
          type: { student: true },

          firstName: this.userDataFormGroup.get('firstName')?.value,
          lastName: this.userDataFormGroup.get('lastName')?.value,
          preferredName: this.userDataFormGroup.get('preferredName')?.value,

          age: this.userDataFormGroup.get('age')?.value,
          birthdate: `${this.userDataFormGroup.get('day')?.value}/
                      ${this.userDataFormGroup.get('month')?.value}/
                      ${this.userDataFormGroup.get('year')?.value}`,

          addressLine1: this.userDataFormGroup.get('addressLine1')?.value,
          addressLine2: this.userDataFormGroup.get('addressLine2')?.value,

          city: this.userDataFormGroup.get('city')?.value,
          state: this.userDataFormGroup.get('state')?.value,
          zipcode: this.userDataFormGroup.get('zipcode')?.value,

          country: this.userDataFormGroup.get('country')?.value,

          grade: this.studentFormGroup.get('grade')?.value,
          school: this.studentFormGroup.get('school')?.value,
          description: this.studentFormGroup.get('description')?.value,

          interests: this.interests
        };

        this.userdata.Post(student);

        this.router.navigate(['dashboard']);
      }
    });
  }

}
