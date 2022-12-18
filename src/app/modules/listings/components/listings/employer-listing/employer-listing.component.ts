import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployerDataModel } from 'src/app/modules/auth/components/add-user-data/user-data';
import { Listing } from '../../../models/listing';
import { ListingService } from '../../../services/listing/listing.service';

@Component({
  selector: 'app-employer-listing',
  templateUrl: './employer-listing.component.html',
  styleUrls: ['./employer-listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployerListingComponent implements OnInit {

  @Input() userdata: any;
  employerData!: EmployerDataModel

  listings!: Observable<Listing[]>

  constructor(
    private listingService: ListingService
  ) { }

  ngOnInit(): void {
    this.employerData = this.userdata as EmployerDataModel;

    this.listings = this.listingService.Get()
  }

}
