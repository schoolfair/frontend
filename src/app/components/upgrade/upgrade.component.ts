import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  basicPricingId = environment.stripePricing.basic;
  proPricingId = environment.stripePricing.pro;

}
