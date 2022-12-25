import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat';
import { from } from 'rxjs';
import { FirestoreService } from 'src/app/modules/shared/services/firestorage-service';
import { Application } from '../../models/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService extends FirestoreService<Application> {

  constructor(private _afs: AngularFirestore) {
    super("applications", _afs)
  }

  GetByUserId(userId: string) {
    return from(this.collectionRef.ref.where('userId', '==', userId).get());
  }

  accept(appId: string) {
    return this.Update(appId, {accepted: true});
  }

  reject(appId: string) {
    return this.Update(appId, {accepted: false});
  }

}
