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
import { BrowserModule } from '@angular/platform-browser';
import { ViewApplicationsComponent } from './components/view-applications/view-applications.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ListingsComponent,
    ListingComponent,
    CreateListingComponent,
    EmployerListingComponent,
    StudentListingComponent,
    ViewApplicationsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AngularFireAuthModule,
    ListingsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ListingsModule { }
