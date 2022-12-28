import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { FirebaseService } from 'src/app/modules/auth/services/firebase/firebase.service';
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
    private firebase: FirebaseService
  ) { }

  applications!: Application[];
  listings: Listing[] = []

  ngOnInit(): void {
    this.firebase.user.subscribe((user?: User) => {
      if (user) {
        this.applicationService.Get().pipe(first()).subscribe((data?: Application[]) => {
          if (data) {
            this.applications = data.filter(app => app.userId == user.uid);
          }

          this.applications.forEach((app, i) => {
            this.listingService.GetById(app.listingId).subscribe((data?: Listing) => {
              if (data) {
                this.listings[i] = data;
              }
            });
          });
        });
      }
    })

  }

}
