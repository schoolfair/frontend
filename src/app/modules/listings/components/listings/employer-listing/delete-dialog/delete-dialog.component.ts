import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ListingService } from 'src/app/modules/listings/services/listing/listing.service';
import { DeleteDialogData } from './delete-dialog-data';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData,
    private listingService: ListingService,
    private router: Router
  ) { }

  deleteListing() {
    this.listingService.Delete(this.data.listingId).then(() => {
      this.router.navigate(['']);
    });
  }

}
