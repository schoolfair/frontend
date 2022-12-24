import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { AuthModule } from '../auth/auth.module';
import { MaterialModule } from '../material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    AuthModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
