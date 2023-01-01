import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { User } from 'src/app/modules/auth/services/firebase/user';
import { Listing } from 'src/app/modules/listings/models/listing';
import { ListingService } from 'src/app/modules/listings/services/listing/listing.service';
import { Application } from '../../models/application';
import { ApplicationService } from '../../services/application/application.service';

@Component({
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  constructor(
    private applicationService: ApplicationService,
    private listingService: ListingService,
    private firebase: AuthService,
    private router: Router
  ) { }

  displayedColumns = ['name', 'institution', 'status', 'info'];

  applications!: Application[];
  listings: Listing[] = []

  listingIds: Set<string> = new Set<string>();

  ngOnInit(): void {
    this.firebase.user.subscribe((user?: User) => {
      if (user) {
        this.applicationService.Get().pipe(first()).subscribe((data?: Application[]) => {
          if (data) {
            this.applications = data.filter(app => app.userId == user.uid);

            this.applications.forEach((app) => {
              this.listingIds.add(app.listingId);
            })

            this.listingIds.forEach((listingId) => {
              this.listingService.GetById(listingId).subscribe((listingData?: Listing) => {

                if (listingData) {
                  this.listings.push(listingData);
                  console.log(this.listings);
                }
              });
            });
          }
        });
      }
    })

  }

  gotoApplication(application: Application) {
    this.router.navigate(['applications', 'app', application.uid]);
  }

}
