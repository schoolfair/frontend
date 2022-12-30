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
import { ApplicationComponent } from './components/application/application.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [

    ApplyComponent,
    ViewApplicationsComponent,
    ApplicationComponent,
    ApplicationsComponent
  ],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    MaterialModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    ApplicationService
  ]
})
export class ApplicationsModule { }
