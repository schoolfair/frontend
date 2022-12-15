import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user-data',
  templateUrl: './add-user-data.component.html',
  styleUrls: ['./add-user-data.component.scss']
})
export class AddUserDataComponent implements OnInit {

  roleFormGroup: FormGroup;

  constructor() {
    this.roleFormGroup = new FormGroup({
      role: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
  }

}
