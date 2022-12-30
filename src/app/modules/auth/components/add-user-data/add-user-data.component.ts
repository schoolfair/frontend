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


        age: new UntypedFormControl('', [Validators.required]), // Numbers regex

        // date lines

        month: new UntypedFormControl('', [Validators.required]),
        day: new UntypedFormControl('', [Validators.required]),
        year: new UntypedFormControl('', [Validators.required]),

        // address lines

        addressLine1: new UntypedFormControl('', [Validators.required]),
        addressLine2: new UntypedFormControl('', []),

        city: new UntypedFormControl('', [Validators.required]),
        state: new UntypedFormControl('',),
        zipcode: new UntypedFormControl('', [Validators.required]),

        country: new UntypedFormControl('', [Validators.required])
    });

  }

  get roleControl() {
    return this.roleFormGroup.get('role')

  }

  get role() {
    return this.roleControl?.value
  }

  ngOnInit() {
  }


}
