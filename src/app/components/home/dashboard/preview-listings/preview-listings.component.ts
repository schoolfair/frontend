import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Application } from 'src/app/modules/applications/models/application';
import { ApplicationService } from 'src/app/modules/applications/services/application/application.service';
import { Listing } from 'src/app/modules/listings/models/listing';
import { ListingService } from 'src/app/modules/listings/services/listing/listing.service';

@Component({
  selector: 'app-preview-listings',
  templateUrl: './preview-listings.component.html',
  styleUrls: ['./preview-listings.component.scss'],
})
export class PreviewListingsComponent implements OnInit {

  listings: Listing[] = [];
  applications: number[] = [];

  @Input() userId!: string;

  constructor(
    private listingService: ListingService,
    private applicationService: ApplicationService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.listingService.Get().pipe(first()).subscribe((data?: Listing[]) => {
      if (data) {
        this.listings = data.filter(listing => listing.creator == this.userId);
      }

      this.listings.forEach((listing, i) => {
        this.applicationService.Get().subscribe((data?: Application[]) => {
          this.applications[i] = data?.filter(app => app.listingId == listing.uid && app.status == undefined).length || 0;
        });
      });
    });

  }

  gotoListings() {
    this.router.navigate(['listings']);
  }

}
