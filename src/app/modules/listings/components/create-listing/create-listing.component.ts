import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployerDataModel } from 'src/app/modules/auth/components/add-user-data/user-data';
import { FirebaseService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { User } from 'src/app/modules/auth/services/firebase/user';
import { UserdataService } from 'src/app/modules/auth/services/userdata/userdata.service';
import { Listing } from '../../models/listing';
import { ListingService } from '../../services/listing/listing.service';

@Component({
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.scss']
})
export class CreateListingComponent implements OnInit {

  formGroup: FormGroup
  essayPrompts: string[] = [];
  numOfEssayPrompts = 1;

  constructor(
    private firebase: FirebaseService,
    private userData: UserdataService,
    private listing: ListingService
  ) {
    this.formGroup = new FormGroup({
      position: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      needsEssay: new FormControl(false, [Validators.required]),
      needsResume: new FormControl(false, [Validators.required]),
      needsInterestStatement: new FormControl(false, [Validators.required])
    })
  }



  ngOnInit(): void {
  }

  get needsEssays() {
    return this.formGroup.get('needsEssay')?.value;
  }

  addEssayPrompt() {
    this.numOfEssayPrompts ++;
  }

  removeEssayPrompt(index: number) {

  }

  addListing() {

    this.firebase.user.subscribe((data: User|undefined) => {

      if (data) {
        this.userData.UserData(data.uid).subscribe((userRawdata: any|undefined) => {
          let userdata = userRawdata as EmployerDataModel;

          console.log(userRawdata);

          let listing: Listing = {
            position: this.formGroup.get('position')?.value,
            description: this.formGroup.get('description')?.value,
            creator: data.uid,
            institution: userdata.institution,
            requirements: {}
          }

          this.listing.Create(listing);

        })
      }
    })
  }

}
