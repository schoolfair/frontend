import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployerDataModel } from 'src/app/modules/auth/models/user-data';
import { Listing } from '../../../models/listing';
import { ListingService } from '../../../services/listing/listing.service';

@Component({
  selector: 'app-employer-listing',
  templateUrl: './employer-listing.component.html',
  styleUrls: ['./employer-listing.component.scss'],
})
export class EmployerListingComponent implements OnInit {

  @Input() userdata: any;
  employerData!: EmployerDataModel

  listings!: Listing[];

  selected = 0;

  constructor(
    private listingService: ListingService
  ) { }

  ngOnInit(): void {

    this.employerData = this.userdata as EmployerDataModel;

    this.listingService.Get().subscribe((data: Listing[]) => {
      this.listings = data.filter((listing: Listing) => listing.institution === this.employerData.institution);
    });
  }

}
