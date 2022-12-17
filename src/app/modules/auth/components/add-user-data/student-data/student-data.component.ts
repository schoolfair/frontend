import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FirebaseService } from '../../../services/firebase/firebase.service';
import { User } from '../../../services/firebase/user';
import { StudentDataModel } from '../user-data';

@Component({
  selector: 'app-student-data',
  templateUrl: './student-data.component.html',
  styleUrls: ['./student-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentDataComponent implements OnInit {

  studentFormGroup: FormGroup;

  constructor(
    private firebase: FirebaseService,
    private router: Router
    ) {
      this.studentFormGroup = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', [Validators.required]),
        age: new FormControl('', [Validators.required]), // Numbers regex
        month: new FormControl('', [Validators.required]),
        day: new FormControl('', [Validators.required]),
        year: new FormControl('', [Validators.required]),
        grade: new FormControl('', [Validators.required]), // regex
        school: new FormControl('', [Validators.required])
      })
    }

  ngOnInit(): void {
  }

  submitStudent() {
    let student: StudentDataModel = {
      firstName: this.studentFormGroup.get('firstName')?.value,
      lastName: this.studentFormGroup.get('lastName')?.value,
      age: this.studentFormGroup.get('age')?.value,
      birthdate: `${this.studentFormGroup.get('day')?.value}/
                  ${this.studentFormGroup.get('month')?.value}/
                  ${this.studentFormGroup.get('year')?.value}`,
      grade: this.studentFormGroup.get('grade')?.value,
      school: this.studentFormGroup.get('school')?.value,
      type: {isStudent: true}
    };

    this.firebase.user.subscribe((user: User |undefined) => {
      if (!user) { console.error("User is undefined."); }
      else {
        this.firebase.SetUserdataData(user.uid, student);
        this.firebase.SetRole(user.uid, {student: true});

        this.router.navigate(['dashboard']);
      }
    });
  }

}
