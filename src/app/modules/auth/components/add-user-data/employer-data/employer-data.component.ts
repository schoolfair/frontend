import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { User } from '../../../services/firebase/user';
import { UserdataService } from '../../../services/userdata/userdata.service';
import { EmployerDataModel } from '../user-data';

@Component({
  selector: 'app-employer-data',
  templateUrl: './employer-data.component.html',
  styleUrls: ['./employer-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployerDataComponent implements OnInit {

  employerFormGroup: FormGroup;
  @Input() userDataFormGroup!: FormGroup;

  constructor(
    private firebase: FirebaseService,
    private userdata: UserdataService,
    private router: Router) {

    this.employerFormGroup = new FormGroup({
      institution: new FormControl('', [Validators.required])
    })

  }

  ngOnInit(): void {
  }

  submitEmployer() {
    let employer: EmployerDataModel = {
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

      institution: this.employerFormGroup.get('company')?.value,
    };

    this.firebase.user.subscribe((user: User |undefined) => {
      if (!user) { console.error("User is undefined."); }
      else {
        this.userdata.Update(user.uid, employer);
        this.firebase.SetRole(user.uid, {employer: true});

        this.router.navigate(['dashboard']);
      }
    });

  }

}
