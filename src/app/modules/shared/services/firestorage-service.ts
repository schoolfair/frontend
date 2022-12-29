import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { environment } from "src/environments/environment";


export abstract class FirestoreService<T>  {

  collectionRef: AngularFirestoreCollection<T>

  constructor(
    private dbPath: string,
    private afs: AngularFirestore
  ) {
    if (!environment.production) {
      this.afs.firestore.useEmulator(`http://localhost`, 8080);
    }

    this.collectionRef = this.afs.collection<T>(this.dbPath);
  }

  Get() {
    return this.collectionRef.valueChanges({idField: 'uid'});
  }

  GetById(uid: string) {
    const docRef = this.afs.doc<T>(
      `${this.dbPath}/${uid}`
    );

    return docRef.valueChanges({idField: 'uid'});
  }

  Create(item: T) {
    return this.collectionRef.add(item);
  }

  Delete(uid: string) {
    return this.collectionRef.doc(uid).delete();
  }

  Update(uid: string, newItem: any) {
    return this.collectionRef.doc(uid).set(newItem, {
      merge: true
    });
  }

}
