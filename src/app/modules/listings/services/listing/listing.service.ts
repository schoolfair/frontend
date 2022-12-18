import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Listing } from '../../models/listing';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  collectionRef = this.afs.collection<Listing>(
    `listings/`
  );

  constructor(
    private afs: AngularFirestore
  ) { }

  Get() {
    return this.collectionRef.valueChanges();
  }

  GetListing(uid: string) {
    const docRef = this.afs.doc<Listing>(
      `listings/${uid}`
    );

    return docRef.snapshotChanges();
  }

  Create(listing: Listing) {
    return this.collectionRef.add(listing);
  }

  Delete(uid: string) {
    return this.collectionRef.doc(uid).delete();
  }

  Update(uid: string, newListing: Listing) {
    return this.collectionRef.doc(uid).set(newListing, {
      merge: true
    });
  }
}
