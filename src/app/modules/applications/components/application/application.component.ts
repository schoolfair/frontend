import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from '../../models/application';
import { ApplicationService } from '../../services/application/application.service'
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ListingService } from 'src/app/modules/listings/services/listing/listing.service';
import { Listing } from 'src/app/modules/listings/models/listing';

@Component({
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  application!: Application;
  resumeLink?: string;

  listing!: Listing;

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private storage: AngularFireStorage,
    private listingService: ListingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.applicationService.GetById(id).subscribe((data: Application|undefined) => {
        if (data) {
          this.application = data;

          this.listingService.GetById(data.listingId).subscribe((data?: Listing) => {
            if (data) {
              this.listing = data;
            }
          })


          if (data.resumeId) {
            this.getResume(data.resumeId).subscribe((url: string) => {
              this.resumeLink = url;
            })
          }
        }
      })
    }

  }

  getResume(id: string) {
    return this.storage.ref(`resumes/${id}`).getDownloadURL()
  }

  accept() {
    if (this.application.uid) {
      this.applicationService.accept(this.application.uid);
      this.router.navigate(['']);
    }
  }

  reject() {
    if (this.application.uid) {
      this.applicationService.reject(this.application.uid);
      this.router.navigate(['']);
    }
  }

}
