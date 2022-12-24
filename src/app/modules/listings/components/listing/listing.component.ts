import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Listing } from '../../models/listing';
import { ListingService } from '../../services/listing/listing.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  id!: string;
  listing!: Listing;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listings: ListingService) { }

  ngOnInit() {
    const _id = this.route.snapshot.paramMap.get('id');
    if (_id) {
      this.id = _id;

      this.listings.GetById(_id).subscribe((data: Listing|undefined) => {
        if (data) {
          this.listing = data;
        }
      });
    } else {
      this.router.navigate(['listings'])
    }
  }

  gotoApplyPage() {
    this.router.navigate(['applications', 'apply', this.id]);
  }

}
