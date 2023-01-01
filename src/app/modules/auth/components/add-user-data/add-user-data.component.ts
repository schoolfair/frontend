import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { countryList, states } from 'src/app/modules/shared/models/geography';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { User } from '../../services/firebase/user';
import { StudentDataModel } from '../../models/user-data';

@Component({
  selector: 'app-add-user-data',
  templateUrl: './add-user-data.component.html',
  styleUrls: ['./add-user-data.component.scss'],
})
export class AddUserDataComponent implements OnInit {

  roleFormGroup: UntypedFormGroup;
  userDataFormGroup: UntypedFormGroup;

  countryList = countryList;
  statesList = states;

  constructor(
    private firebase: FirebaseService,
    private router: Router
  ) {

    this.roleFormGroup = new UntypedFormGroup({
      role: new UntypedFormControl('', [Validators.required])
    });

    this.userDataFormGroup = new UntypedFormGroup({
        firstName: new UntypedFormControl('', Validators.required),
        lastName: new UntypedFormControl('', [Validators.required]),
        preferredName: new UntypedFormControl('', [Validators.required]),

        zipcode: new UntypedFormControl('', [Validators.required, Validators.maxLength(5)]),
    });

  }

  get roleControl() {
    return this.roleFormGroup.get('role')

  }

  get role() {
    return this.roleControl?.value
  }

  errorMessage(controlName: string) {

    let control = this.userDataFormGroup.get(controlName);

    if (!control) {
      return 'No control with this name';
    }

    if (control.hasError('required')) {
      return 'This field is required';
    }

    if (control.hasError('email')) {
      return 'Not a valid email';
    }

    return '';
  }

  ngOnInit() {
  }


}
