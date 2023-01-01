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

  hasErrors = false;
  isLoading = false;

  constructor(
    private firebase: FirebaseService,
    private userdata: UserdataService,
    private router: Router
    ) {
      this.studentFormGroup = new UntypedFormGroup({

        description: new UntypedFormControl('', [Validators.required]),

        // student specific

        grade: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(12)]), // regex
        school: new UntypedFormControl('', [Validators.required]),
      })
    }

  ngOnInit(): void {
  }

  errorMessage(controlName: string) {

    let control = this.studentFormGroup.get(controlName);

    if (!control) {
      return 'No control with this name';
    }

    if (control.hasError('required')) {
      return 'This field is required';
    }

    if (control.hasError('email')) {
      return 'Not a valid email';
    }

    if (control.hasError('max')) {
      return 'This number is too big';
    }

    if (control.hasError('min')) {
      return 'This number is too small';
    }

    return '';
  }

  submitStudent() {

    if (this.studentFormGroup.invalid || this.userDataFormGroup.invalid) {
      this.hasErrors = true;
      return ;
    }

    this.hasErrors = false;
    this.isLoading = true;

    this.firebase.user.subscribe((user: User |undefined) => {
      if (!user) { console.error("User is undefined."); }
      else {

        let student: StudentDataModel = {

          uid: user.uid,
          email: user.email,
          type: { student: true },

          firstName: this.userDataFormGroup.get('firstName')?.value,
          lastName: this.userDataFormGroup.get('lastName')?.value,
          preferredName: this.userDataFormGroup.get('preferredName')?.value,

          zipcode: this.userDataFormGroup.get('zipcode')?.value,

          grade: this.studentFormGroup.get('grade')?.value,
          school: this.studentFormGroup.get('school')?.value,
          description: this.studentFormGroup.get('description')?.value,

          interests: this.interests
        };

        this.userdata.Post(student);

        this.isLoading = false;

        this.router.navigate(['dashboard']);
      }
    });
  }

}
