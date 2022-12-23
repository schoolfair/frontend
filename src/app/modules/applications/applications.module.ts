import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplyComponent } from './components/apply/apply.component';
import { ViewApplicationsComponent } from './components/view-applications/view-applications.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [

    ApplyComponent,
    ViewApplicationsComponent
  ],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    MaterialModule
  ]
})
export class ApplicationsModule { }
