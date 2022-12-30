import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
import { StudentDataModel, UserDataModel } from 'src/app/modules/auth/models/user-data';
import { FirebaseService } from 'src/app/modules/auth/services/firebase/firebase.service';
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

  selected: number = 0;

  displayedColumns = ['position', 'institution']

  constructor(
    private listingService: ListingService
  ) { }

  ngOnInit(): void {
    this.studentData = this.userdata as StudentDataModel;

    this.listingService.Get().subscribe((data: Listing[]) => {
      this.listings = data;
    });
  }

}

