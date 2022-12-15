import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FirebaseService } from './services/firebase/firebase.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddUserDataComponent } from './components/add-user-data/add-user-data.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { MaterialModule } from '../material/material.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AddUserDataComponent,
    VerifyEmailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MaterialModule,
    AngularFireAuthModule,
  ], providers: [
    FirebaseService
  ]
})
export class AuthModule { }
