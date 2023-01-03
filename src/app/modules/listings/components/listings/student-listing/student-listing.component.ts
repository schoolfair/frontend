import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/compat/firestore';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Observable, ReplaySubject } from 'rxjs';
import { StudentDataModel, UserDataModel } from 'src/app/modules/auth/models/user-data';
import { AuthService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { StripeRoles } from 'src/app/modules/auth/services/subscription/stripe-roles';
import { SubscriptionService } from 'src/app/modules/auth/services/subscription/subscription.service';
import { Listing } from '../../../models/listing';
import { ListingService } from '../../../services/listing/listing.service';


@Component({
  selector: 'app-student-listing',
  templateUrl: './student-listing.component.html',
  styleUrls: ['./student-listing.component.scss'],
})
export class StudentListingComponent implements OnInit {

  @Input() userdata: any;
  studentData!: StudentDataModel

  listings!: Listing[];

  claims?: StripeRoles;

  selected: number = 0;

  displayedColumns = ['position', 'institution']

  constructor(
    private listingService: ListingService,
    private subscriptions: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.studentData = this.userdata as StudentDataModel;

    this.listingService.Get().subscribe((data: Listing[]) => {
      this.listings = data;
    });

    this.subscriptions.getClaimRole().then((data: any) => {
      console.log(data);
      this.claims = data;
    });
  }

}

