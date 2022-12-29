import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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

  studentFormGroup: FormGroup;

  @Input() userDataFormGroup!: FormGroup;

  constructor(
    private firebase: FirebaseService,
    private userdata: UserdataService,
    private router: Router
    ) {
      this.studentFormGroup = new FormGroup({

        description: new FormControl('', [Validators.required]),

        // student specific

        grade: new FormControl('', [Validators.required]), // regex
        school: new FormControl('', [Validators.required]),
        interests: new FormArray([])
      })
    }

  ngOnInit(): void {
  }

  onEnter(event: Event) {
    const el = event.target as HTMLInputElement
    this.interests.push(new FormControl(el.value));
    el.value = "";
  }

  remove(i: number) {
    this.interests.removeAt(i);
  }

  get interests() {
    return (this.studentFormGroup.get('interests') as FormArray);
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
        };

        this.userdata.Post(student);

        this.router.navigate(['dashboard']);
      }
    });
  }

}
