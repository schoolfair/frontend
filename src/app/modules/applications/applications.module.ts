import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplyComponent } from './components/apply/apply.component';
import { ViewApplicationsComponent } from './components/view-applications/view-applications.component';
import { MaterialModule } from '../material/material.module';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicationService } from './services/application/application.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


@NgModule({
  declarations: [

    ApplyComponent,
    ViewApplicationsComponent
  ],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    MaterialModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ReactiveFormsModule
  ],
  providers: [
    ApplicationService
  ]
})
export class ApplicationsModule { }
