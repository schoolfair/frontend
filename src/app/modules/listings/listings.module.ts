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
import { NgxEditorModule } from 'ngx-editor';
import { AdsenseModule } from 'ng2-adsense';
import { DeleteDialogComponent } from './components/listings/employer-listing/delete-dialog/delete-dialog.component';


@NgModule({
  declarations: [
    ListingsComponent,
    ListingComponent,
    CreateListingComponent,
    EmployerListingComponent,
    StudentListingComponent,
    ViewApplicationsComponent,
    DeleteDialogComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    AngularFireAuthModule,
    ListingsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AdsenseModule,
    NgxEditorModule.forRoot({
      locals: {
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        underline: 'Underline',
        strike: 'Strike',
        blockquote: 'Blockquote',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
      }
    }),
  ]
})
export class ListingsModule { }
