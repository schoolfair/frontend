import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  roleFormGroup: FormGroup;
  userDataFormGroup: FormGroup;

  countryList = countryList;
  statesList = states;

  constructor(
    private firebase: FirebaseService,
    private router: Router
  ) {

    this.roleFormGroup = new FormGroup({
      role: new FormControl('', [Validators.required])
    });

    this.userDataFormGroup = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', [Validators.required]),
        preferredName: new FormControl('', [Validators.required]),


        age: new FormControl('', [Validators.required]), // Numbers regex

        // date lines

        month: new FormControl('', [Validators.required]),
        day: new FormControl('', [Validators.required]),
        year: new FormControl('', [Validators.required]),

        // address lines

        addressLine1: new FormControl('', [Validators.required]),
        addressLine2: new FormControl('', []),

        city: new FormControl('', [Validators.required]),
        state: new FormControl('',),
        zipcode: new FormControl('', [Validators.required]),

        country: new FormControl('', [Validators.required])
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
