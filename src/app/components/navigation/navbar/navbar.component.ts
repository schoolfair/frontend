import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ApplicationRef, OnChanges, SimpleChanges, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { User } from 'src/app/modules/auth/services/firebase/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnDestroy {


  data: any;

  isOpen: boolean = false;

  constructor(
    public firebase: AuthService,
    private cdr: ChangeDetectorRef
    ) {


  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

}
