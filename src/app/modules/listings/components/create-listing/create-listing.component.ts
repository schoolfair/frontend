import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployerDataModel } from 'src/app/modules/auth/components/add-user-data/user-data';
import { FirebaseService } from 'src/app/modules/auth/services/firebase/firebase.service';
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

  formGroup: FormGroup
  numOfEssayPrompts = 1;

  tags = [];

  allTags = Tags;

  constructor(
    private firebase: FirebaseService,
    private userData: UserdataService,
    private listing: ListingService,
    private router: Router
  ) {
    this.formGroup = new FormGroup({
      position: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      needsEssay: new FormControl(false, [Validators.required]),
      needsResume: new FormControl(false, [Validators.required]),
      needsInterestStatement: new FormControl(false, [Validators.required]),
      prompts: new FormArray([]),
    })
  }

  ngOnInit(): void {
  }

  get needsEssays() {
    return this.formGroup.get('needsEssay')?.value;
  }

  get essayPrompts() {
    return this.formGroup.get('prompts') as FormArray;
  }

  private essayPrompt() {
    return new FormControl('', [Validators.required]);
  }

  addEssayPrompt() {
    this.essayPrompts.push(this.essayPrompt())
  }

  removeEssayPrompt(index: number) {
    this.essayPrompts.removeAt(index);

  }

  getControl(index: number) {
    return this.essayPrompts.get(index.toString()) as FormControl;
  }

  addListing() {

    this.firebase.user.subscribe((data: User|undefined) => {

      if (data) {
        this.userData.GetById(data.uid).subscribe((userRawdata: any|undefined) => {
          let userdata = userRawdata as EmployerDataModel;

          let listing: Listing = {
            position: this.formGroup.get('position')?.value,
            description: this.formGroup.get('description')?.value,
            tags: this.tags,
            creator: data.uid,
            institution: userdata.institution,
            requirements: {
              interestStatement: this.formGroup.get('needsInterestStatement')?.value,
              resume:  this.formGroup.get('needsResume')?.value,
              essays:  this.formGroup.get('needsEssay')?.value,
              essayPrompts: this.formGroup.get('prompts')?.value
            }
          }

          if (!listing.requirements.essays) {
            listing.requirements.essayPrompts = undefined;
          }

          this.listing.Create(listing);

          this.router.navigate(['listings'])

        })
      }
    })
  }

}
