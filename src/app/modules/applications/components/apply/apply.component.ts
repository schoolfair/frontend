import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { Listing } from 'src/app/modules/listings/models/listing';
import { ListingService } from 'src/app/modules/listings/services/listing/listing.service';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Guid } from 'guid-typescript';
import { animate, style, transition, trigger } from '@angular/animations';
import { Application } from '../../models/application';
import { AuthService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { User } from 'src/app/modules/auth/services/firebase/user';
import { ApplicationService } from '../../services/application/application.service';

@Component({
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss'],
})
export class ApplyComponent implements OnInit {

  id!: string;
  listing!: Listing;

  file: File | null = null;

  fileId!: Guid;

  private basePath = '/resumes';

  applicationFormGroup: UntypedFormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingService: ListingService,
    private storage: AngularFireStorage,
    private user: AuthService,
    private applicationService: ApplicationService
  ) {
    this.applicationFormGroup = new UntypedFormGroup({
      interestStatement: new UntypedFormControl('', Validators.maxLength(2500)),
      essays: new UntypedFormArray([]),
    });
  }

  get interestStatementControl() {
    return this.applicationFormGroup.get('interestStatement') as UntypedFormControl;
  }

  get essays() {
    return this.applicationFormGroup.get('essays') as UntypedFormArray;
  }

  essayControl(i: number) {
    return this.essays.get(i.toString()) as UntypedFormControl;
  }

  ngOnInit(): void {

    const _id = this.route.snapshot.paramMap.get('uid')

    if (_id) {
      this.id = _id;

      this.listingService.GetById(_id).subscribe((listing: Listing|undefined) => {
        if (listing) {
          this.listing = listing;
          if (listing.requirements.essays) {
            if (listing.requirements.essayPrompts) {
              for (let i = 0; i < listing.requirements.essayPrompts?.length; i++) {
                this.essays.push(new UntypedFormControl('', [Validators.required]));
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

  selectFile( event: Event ) {
    const element = (event.target as HTMLInputElement);
    if (element && element.files)
      this.file = element.files[0];
  }

  pushFileToStorage(fileUpload: File): Observable<number | undefined> {

    this.fileId = Guid.create();

    const filePath = `${this.basePath}/${this.fileId.toString()}`;
    //const storageRef = this.storage.ref(filePath);
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

    this.user.user.subscribe((data: User|undefined) => {
      if (data && this.listing.uid) {
        let application: Application = {
          userId: data.uid,
          listingId: this.listing.uid
        }

        if (this.listing.requirements.resume) {
          application.resumeId = this.fileId.toString();
        }

        if (this.listing.requirements.essays) {
          application.essays = this.essays.value;
        }

        if (this.listing.requirements.interestStatement) {
          application.interestStatement = this.applicationFormGroup.get('interestStatement')?.value;
        }

        this.applicationService.Create(application);

        this.router.navigate(['']);

      }
    })
  }
}
