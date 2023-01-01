import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { AuthModule } from '../auth/auth.module';
import { MaterialModule } from '../material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { UpdateUserComponent } from './components/update-user/update-user.component';


@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    AuthModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UserModule { }
