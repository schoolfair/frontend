import { AfterViewInit, ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import {AngularFireFunctions} from '@angular/fire/compat/functions';
import { MatDialog } from '@angular/material/dialog';

import { FirebaseService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { environment } from 'src/environments/environment';

declare var StripeCheckout: any;
declare var Stripe: any; // Stripe.js

interface CheckoutSession {
  error: any;
  url: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent implements OnInit {

  constructor(
    private auth: FirebaseService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
  }

  isLoading = false;

  /**
   * The price ID of the product to be purchased.
   */
  @Input() priceId!: string;

  // Open the checkout handler
  checkout(e: Event) {
    this.isLoading = true;
    this.auth.user.subscribe(async (data) => {
      if (!data) {
        this.isLoading = false;
        return;
      }

      const docRef = await this.db
        .collection('customers')
        .doc(data.uid)
        .collection('checkout_sessions')
        .add({
          price: this.priceId,
          success_url: window.location.origin,
          cancel_url: window.location.origin,
        });
      // Wait for the CheckoutSession to get attached by the extension
      docRef.onSnapshot((snap) => {
        if (!snap.data()) {
          this.isLoading = false;
          return;
        }

        const { error, url } = snap.data() as CheckoutSession;
        if (error) {
          // Show an error to your customer and
          // inspect your Cloud Function logs in the Firebase console.
          alert(`An error occured: ${error.message}`);
          this.isLoading = false;
        }
        if (url) {
          this.isLoading = false;
          // We have a Stripe Checkout URL, let's redirect.
          window.location.assign(url);
        }
      });
    });

  }

}
