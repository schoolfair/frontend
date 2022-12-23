import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Listing } from 'src/app/modules/listings/models/listing';
import { ListingService } from 'src/app/modules/listings/services/listing/listing.service';

@Component({
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  id!: string;
  listing!: Listing;

  applicationFormGroup: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingService: ListingService
  ) {
    this.applicationFormGroup = new FormGroup({
      interestStatement: new FormControl('', Validators.maxLength(2500)),
      essays: new FormControl('', Validators.maxLength(2500)),
    });
  }

  ngOnInit(): void {

    const _id = this.route.snapshot.paramMap.get('uid')

    if (_id) {
      this.id = _id;

      this.listingService.GetListing(_id).subscribe((listing: Listing|undefined) => {
        if (listing) {
          this.listing = listing;
        } else {
          this.router.navigate(['listings']);
        }
      });

    } else {
      this.router.navigate(['listings']);
    }

  }

}
