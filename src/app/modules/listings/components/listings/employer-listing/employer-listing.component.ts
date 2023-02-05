import { Component, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first, Observable } from 'rxjs';
import { EmployerDataModel } from 'src/app/modules/auth/models/user-data';
import { Listing } from '../../../models/listing';
import { ListingService } from '../../../services/listing/listing.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-employer-listing',
  templateUrl: './employer-listing.component.html',
  styleUrls: ['./employer-listing.component.scss'],
})
export class EmployerListingComponent implements OnInit {

  @Input() userdata: any;
  employerData!: EmployerDataModel

  listings!: Listing[];

  selected = 0;

  constructor(
    private listingService: ListingService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.employerData = this.userdata as EmployerDataModel;

    this.listingService.Get().pipe(first()).subscribe((data: Listing[]) => {
      this.listings = data.filter((listing: Listing) => listing.institution === this.employerData.institution);
    });
  }

  tracker = (index: number, name: Listing): string => {
    return name.uid? name.uid : index.toString();
  }

  openErrorDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      enterAnimationDuration: enterAnimationDuration,
      exitAnimationDuration: exitAnimationDuration,
      data: {
        listingId: this.listings[this.selected].uid
      }
    })
  }

}
