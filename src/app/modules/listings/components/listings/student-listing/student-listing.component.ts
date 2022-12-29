import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { StudentDataModel, UserDataModel } from 'src/app/modules/auth/models/user-data';
import { FirebaseService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { Listing } from '../../../models/listing';
import { ListingService } from '../../../services/listing/listing.service';

@Component({
  selector: 'app-student-listing',
  templateUrl: './student-listing.component.html',
  styleUrls: ['./student-listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentListingComponent implements OnInit {

  @Input() userdata: any;
  studentData!: StudentDataModel

  listings!: Observable<Listing[]>

  constructor(
    private listingService: ListingService
  ) { }

  ngOnInit(): void {
    this.studentData = this.userdata as StudentDataModel;

    this.listings = this.listingService.Get()
  }

}
