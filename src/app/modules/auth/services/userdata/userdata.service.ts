import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { FirestoreService } from 'src/app/modules/shared/services/firestorage-service';
import { environment } from 'src/environments/environment';
import { UserDataModel } from '../../models/user-data';

@Injectable({
  providedIn: 'root'
})
export class UserdataService extends FirestoreService<any> {

  constructor(_afs: AngularFirestore,
    private http: HttpClient
  ) {
    super('user-data', _afs);
   }

  Post(newItem: any) {
    return this.http.post(`${environment.apiUrl}/user-data`, newItem).subscribe((data) => console.log(data));
   }

  /**
   * Set the user data
   */
  // SetUserdataData(uid: string, data: UserDataModel) {
  //   const userDataRef: AngularFirestoreDocument<any> = this.afs.doc(
  //     `user-data/${uid}`
  //   );

  //   return userDataRef.set(data, {
  //     merge: true
  //   })
  // }

  // UserData(uid: string) {
  //   const userDataRef: AngularFirestoreDocument<any> = this.afs.doc(
  //     `user-data/${uid}`
  //   );

  //   return userDataRef.valueChanges();
  // }
}
