import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { AuthModule } from '../auth/auth.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    AuthModule,
    MaterialModule
  ]
})
export class UserModule { }
