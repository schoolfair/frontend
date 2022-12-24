import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { Listing } from 'src/app/modules/listings/models/listing';
import { ListingService } from 'src/app/modules/listings/services/listing/listing.service';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Guid } from 'guid-typescript';

@Component({
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  id!: string;
  listing!: Listing;

  private file: File | null = null;

  fileId!: Guid;

  private basePath = '/resumes';

  applicationFormGroup: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingService: ListingService,
    private storage: AngularFireStorage
  ) {
    this.applicationFormGroup = new FormGroup({
      interestStatement: new FormControl('', Validators.maxLength(2500)),
      essays: new FormArray([]),
    });
  }

  get essays() {
    return this.applicationFormGroup.get('essays') as FormArray;
  }

  essayControl(i: number) {
    return this.essays.get(i.toString()) as FormControl;
  }

  ngOnInit(): void {

    const _id = this.route.snapshot.paramMap.get('uid')

    if (_id) {
      this.id = _id;

      this.listingService.GetListing(_id).subscribe((listing: Listing|undefined) => {
        if (listing) {
          this.listing = listing;
          if (listing.requirements.essays) {
            if (listing.requirements.essayPrompts) {
              for (let i = 0; i < listing.requirements.essayPrompts?.length; i++) {
                this.essays.push(new FormControl('', [Validators.required]));
              }
            }
          }
        } else {
          this.router.navigate(['listings']);
        }
      });

    } else {
      this.router.navigate(['listings']);
    }

  }

  selectFile( event: FileList ) {
    const file = event && event.item(0);
    this.file = file;
  }

  pushFileToStorage(fileUpload: File): Observable<number | undefined> {

    this.fileId = Guid.create();

    const filePath = `${this.basePath}/${this.fileId.toString()}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload)

    return uploadTask.percentageChanges();
  }

  uploadFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.applicationFormGroup.patchValue({
        fileSource: file
      })
    }
  }

  submit() {

    if (this.listing.requirements.resume) {
      if (this.file) {
        this.pushFileToStorage(this.file);
      }
      else {
        return;
      }
    }

  }

}
