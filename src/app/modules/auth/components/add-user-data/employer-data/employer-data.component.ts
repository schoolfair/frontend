import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { User } from '../../../services/firebase/user';
import { UserdataService } from '../../../services/userdata/userdata.service';
import { EmployerDataModel } from '../../../models/user-data';

@Component({
  selector: 'app-employer-data',
  templateUrl: './employer-data.component.html',
  styleUrls: ['./employer-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployerDataComponent implements OnInit {

  employerFormGroup: UntypedFormGroup;
  @Input() userDataFormGroup!: UntypedFormGroup;

  hasErrors = false;

  constructor(
    private firebase: FirebaseService,
    private userdata: UserdataService,
    private router: Router) {

    this.employerFormGroup = new UntypedFormGroup({
      institution: new UntypedFormControl('', [Validators.required])
    })

  }

  ngOnInit(): void {
  }

  errorMessage(controlName: string) {

    let control = this.employerFormGroup.get(controlName);

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

  submitEmployer() {

    if (this.employerFormGroup.invalid || this.userDataFormGroup.invalid) {
      this.hasErrors = true;
      return ;
    }

    this.hasErrors = false;

    this.firebase.user.subscribe((user: User |undefined) => {
      if (!user) { console.error("User is undefined."); }
      else {

        let employer: EmployerDataModel = {

          uid: user.uid,
          type: {employer: true},

          firstName: this.userDataFormGroup.get('firstName')?.value,
          lastName: this.userDataFormGroup.get('lastName')?.value,
          preferredName: this.userDataFormGroup.get('preferredName')?.value,


          zipcode: this.userDataFormGroup.get('zipcode')?.value,


          institution: this.employerFormGroup.get('institution')?.value,
        };

        this.userdata.Post(employer);

        this.router.navigate(['dashboard']);
      }


    });

  }

}
