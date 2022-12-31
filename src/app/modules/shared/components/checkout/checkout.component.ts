import { AfterViewInit, ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';

import {AngularFireFunctions} from '@angular/fire/compat/functions';
import { MatDialog } from '@angular/material/dialog';

import { FirebaseService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { environment } from 'src/environments/environment';

declare var StripeCheckout: any;
declare var Stripe: any; // Stripe.js

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent implements OnInit {

  constructor(
    private auth: FirebaseService,
    private functions: AngularFireFunctions,
  ) {}

  @Input() amount!: number;
  @Input() description!: string;

  handler!: any;

  confirmation: any;
  loading = false;

  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      locale: 'auto',
      source: (source: any) => {
        this.loading = true;
        this.auth.user.subscribe(user => {
          if (!user) return;

          const fun = this.functions.httpsCallable('stripeCreateCharge');
          this.confirmation = fun({ source: source.id, uid: user.uid, amount: this.amount }).toPromise();
          this.loading = false;
        })

      }
    });
  }

  // Open the checkout handler
  checkout(e: Event) {
    this.auth.user.subscribe(user => {
      if (!user) return;

      this.handler.open({
        name: 'Schoolfair',
        description: this.description,
        amount: this.amount,
        email: user.email,
      });
      e.preventDefault();
    })
  }

  // Close on navigate
  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close();
  }
}
