import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from 'src/app/modules/shared/services/firestorage-service';
import { Listing } from '../../models/listing';

@Injectable({
  providedIn: 'root'
})
export class ListingService extends FirestoreService<Listing> {

  constructor(private _afs: AngularFirestore) {
    super("listings", _afs);
  }
}
