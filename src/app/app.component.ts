import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'schoolfair';

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    if (!environment.production && environment.isEmulating) {
      this.afAuth.useEmulator(environment.authEmulatorURL);
      this.afs.firestore.useEmulator(`localhost`, 8080)
    }
  }
}
