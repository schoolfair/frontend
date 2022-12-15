import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { User } from 'src/app/services/firebase/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {

  user!: Observable<User|undefined>;

  constructor(public firebase: FirebaseService) {
    this.user = this.firebase.user;
  }

  ngOnInit(): void {

  }

}
