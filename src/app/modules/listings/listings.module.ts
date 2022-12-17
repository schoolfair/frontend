import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingsRoutingModule } from './listings-routing.module';
import { ListingsComponent } from './components/listings/listings.component';
import { CreateListingComponent } from './components/create-listing/create-listing.component';


@NgModule({
  declarations: [
    ListingsComponent,
    CreateListingComponent
  ],
  imports: [
    CommonModule,
    ListingsRoutingModule
  ]
})
export class ListingsModule { }
