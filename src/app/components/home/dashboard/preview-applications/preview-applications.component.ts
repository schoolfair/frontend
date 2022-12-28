import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Application } from 'src/app/modules/applications/models/application';
import { ApplicationService } from 'src/app/modules/applications/services/application/application.service';
import { Listing } from 'src/app/modules/listings/models/listing';
import { ListingService } from 'src/app/modules/listings/services/listing/listing.service';

@Component({
  selector: 'app-preview-applications',
  templateUrl: './preview-applications.component.html',
  styleUrls: ['./preview-applications.component.scss'],
})
export class PreviewApplicationsComponent implements OnInit {

  @Input() userId!: string;

  constructor(
    private applicationService: ApplicationService,
    private listingService: ListingService,
    private router: Router
  ) { }

  applications!: Application[];
  listings: Listing[] = []

  ngOnInit(): void {
    this.applicationService.Get().pipe(first()).subscribe((data?: Application[]) => {
      if (data) {
        this.applications = data.filter(app => app.userId == this.userId);
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

  viewStatus(id?: string) {

  }

  gotoApplications() {
    this.router.navigate(['applications', 'applications'])
  }

}
