import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplyComponent } from './components/apply/apply.component';
import { ViewApplicationsComponent } from './components/view-applications/view-applications.component';
import { MaterialModule } from '../material/material.module';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [

    ApplyComponent,
    ViewApplicationsComponent
  ],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    MaterialModule,
    AngularFireStorageModule,
    ReactiveFormsModule
  ]
})
export class ApplicationsModule { }
