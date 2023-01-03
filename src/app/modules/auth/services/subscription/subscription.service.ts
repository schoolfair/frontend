import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StripeRoles } from './stripe-roles';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  async getClaimRole() {
    const user = await this.afAuth.currentUser;
    if (!user) return null;

    user.getIdToken();

    const decodedToken = await user.getIdTokenResult();

    return decodedToken.claims['stripeRole'] as StripeRoles;
  }
}
