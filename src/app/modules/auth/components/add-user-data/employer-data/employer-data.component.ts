import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { User } from '../../../services/firebase/user';
import { EmployerDataModel } from '../user-data';

@Component({
  selector: 'app-employer-data',
  templateUrl: './employer-data.component.html',
  styleUrls: ['./employer-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployerDataComponent implements OnInit {

  employerFormGroup: FormGroup

  constructor(private firebase: FirebaseService, private router: Router) {

    this.employerFormGroup = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]), // Numbers regex
      month: new FormControl('', [Validators.required]),
      day: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required])
    })

  }

  ngOnInit(): void {
  }

  submitEmployer() {
    let student: EmployerDataModel = {
      firstName: this.employerFormGroup.get('firstName')?.value,
      lastName: this.employerFormGroup.get('lastName')?.value,
      age: this.employerFormGroup.get('age')?.value,
      birthdate: `${this.employerFormGroup.get('day')?.value}/
                  ${this.employerFormGroup.get('month')?.value}/
                  ${this.employerFormGroup.get('year')?.value}`,
      institution: this.employerFormGroup.get('company')?.value,
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
