import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { first, take } from 'rxjs';

import { EmployerDataModel } from 'src/app/modules/auth/models/user-data';
import { AuthService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { User } from 'src/app/modules/auth/services/firebase/user';
import { UserdataService } from 'src/app/modules/auth/services/userdata/userdata.service';
import { Tags } from 'src/app/modules/shared/models/tags';
import { Listing } from '../../models/listing';
import { ListingService } from '../../services/listing/listing.service';

@Component({
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.scss']
})
export class CreateListingComponent implements OnInit {

  listingFormGroup: UntypedFormGroup
  numOfEssayPrompts = 1;



  allTags = Tags;

  constructor(
    private firebase: AuthService,
    private userData: UserdataService,
    private listing: ListingService,
    private router: Router
  ) {


    this.listingFormGroup = new UntypedFormGroup({
      position: new UntypedFormControl('', [Validators.required]),
      description: new UntypedFormControl('', [Validators.required]),
      location: new UntypedFormControl('', [Validators.required]),
      needsEssay: new UntypedFormControl(false, [Validators.required]),
      needsResume: new UntypedFormControl(false, [Validators.required]),
      needsInterestStatement: new UntypedFormControl(false, [Validators.required]),
      prompts: new UntypedFormArray([]),
      tags: new UntypedFormControl([], [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  needsEssays() {
    return this.listingFormGroup.value['needsEssay'] as boolean;
  }

  essayPrompts() {
    return this.listingFormGroup.get('prompts') as UntypedFormArray;
  }

  private essayPrompt() {
    return new UntypedFormControl('', [Validators.required]);
  }



  addEssayPrompt() {
    this.essayPrompts().push(this.essayPrompt())
  }

  removeEssayPrompt(index: number) {
    this.essayPrompts().removeAt(index);

  }

  getControl(index: number) {
    return this.essayPrompts().get(index.toString()) as UntypedFormControl;
  }

  get description() {
    return this.listingFormGroup.get('description') as UntypedFormControl;
  }

  get tagsControl() {
    return this.listingFormGroup.get('tags') as UntypedFormControl;
  }

  addListing() {

    this.firebase.user.pipe(take(1)).subscribe((data: User|undefined) => {

      if (data) {
        this.userData.GetById(data.uid).pipe(first()).subscribe((userRawdata: any|undefined) => {
          let userdata = userRawdata as EmployerDataModel;

          const {position, description, location, needsEssay, needsResume, needsInterestStatement, prompts, tags} = this.listingFormGroup.value;


          let listing: Listing = {
            position: position,
            description: description,
            location: location,
            tags: tags,
            creator: data.uid,
            institution: userdata.institution,
            requirements: {
              interestStatement: needsInterestStatement,
              resume:  needsResume,
              essays:  needsEssay,
              essayPrompts: prompts
            }
          }

          if (!listing.requirements.essays) {
            listing.requirements.essayPrompts = [];
          }

          this.listing.Create(listing);

          this.router.navigate(['listings'])

        })
      }
    })
  }

}
