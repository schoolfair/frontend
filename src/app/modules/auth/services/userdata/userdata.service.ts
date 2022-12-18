import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { UserDataModel } from '../../components/add-user-data/user-data';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  /**
   * Set the user data
   */
  SetUserdataData(uid: string, data: UserDataModel) {
    const userDataRef: AngularFirestoreDocument<any> = this.afs.doc(
      `user-data/${uid}`
    );

    return userDataRef.set(data, {
      merge: true
    })
  }

  UserData(uid: string) {
    const userDataRef: AngularFirestoreDocument<any> = this.afs.doc(
      `user-data/${uid}`
    );

    return userDataRef.valueChanges();
  }
}
