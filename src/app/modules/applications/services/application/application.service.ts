import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from 'src/app/modules/shared/services/firestorage-service';
import { Application } from '../../models/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService extends FirestoreService<Application> {

  constructor(private _afs: AngularFirestore) {
    super("applications", _afs)
  }
}
