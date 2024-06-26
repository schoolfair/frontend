import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Observable, take } from 'rxjs';
import { UserDataModel } from 'src/app/modules/auth/models/user-data';
import { AuthService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { Roles, User } from 'src/app/modules/auth/services/firebase/user';
import { UserdataService } from 'src/app/modules/auth/services/userdata/userdata.service';
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

  roles!: Roles

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listings: ListingService,
    private user: AuthService,
    private userData: UserdataService) { }

  ngOnInit() {
    const _id = this.route.snapshot.paramMap.get('id');
    if (_id) {
      this.id = _id;

      this.listings.GetById(_id).pipe(first()).subscribe((data: Listing|undefined) => {
        if (data) {
          this.listing = data;
        }
      });
    } else {
      this.router.navigate(['listings'])
    }

    this.user.user.pipe(take(1)).subscribe((data?: User) => {
      if (data && data.roles) {
        this.roles = data?.roles;
      }
    });

  }

  gotoApplyPage() {
    this.router.navigate(['applications', 'apply', this.id]);
  }

  gotoApplicationsPage() {
    this.router.navigate(['listings', 'view-applications', this.id]);
  }

}
