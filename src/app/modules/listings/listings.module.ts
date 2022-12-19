import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingsRoutingModule } from './listings-routing.module';
import { ListingsComponent } from './components/listings/listings.component';
import { CreateListingComponent } from './components/create-listing/create-listing.component';
import { EmployerListingComponent } from './components/listings/employer-listing/employer-listing.component';
import { StudentListingComponent } from './components/listings/student-listing/student-listing.component';
import { MaterialModule } from '../material/material.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { ListingComponent } from './components/listing/listing.component';


@NgModule({
  declarations: [
    ListingsComponent,
    ListingComponent,
    CreateListingComponent,
    EmployerListingComponent,
    StudentListingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AngularFireAuthModule,
    ListingsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ListingsModule { }
