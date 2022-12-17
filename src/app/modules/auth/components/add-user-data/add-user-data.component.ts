import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { User } from '../../services/firebase/user';
import { StudentDataModel } from './user-data';

@Component({
  selector: 'app-add-user-data',
  templateUrl: './add-user-data.component.html',
  styleUrls: ['./add-user-data.component.scss'],
})
export class AddUserDataComponent implements OnInit {

  roleFormGroup: FormGroup;

  constructor(
    private firebase: FirebaseService,
    private router: Router) {
    this.roleFormGroup = new FormGroup({
      role: new FormControl('', [Validators.required])
    })

  }

  get role() {
    return this.roleFormGroup.get('role')?.value
  }

  ngOnInit() {
  }


}
