import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ApplicationRef, OnChanges, SimpleChanges, NgZone, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';

import { AuthService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { User } from 'src/app/modules/auth/services/firebase/user';
import { StripeRoles } from 'src/app/modules/auth/services/subscription/stripe-roles';
import { SubscriptionService } from 'src/app/modules/auth/services/subscription/subscription.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  data: any;

  isOpen: boolean = false;

  claims?: StripeRoles;

  subscription: any;

  constructor(
    public firebase: AuthService,
    private cdr: ChangeDetectorRef,
    private subscriptionService: SubscriptionService,
    ) {


  }

  ngOnInit(): void {
    this.subscription = this.firebase.user.pipe(take(1)).subscribe(async (data?: User) => {
      if (!data) {
        return;
      }
      let claims = await this.subscriptionService.getClaimRole()
      if(claims) {
        this.claims = claims;
      } else {
        this.claims = undefined;
      }
    });
  }

}
