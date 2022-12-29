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
import { StudentDataComponent } from './components/add-user-data/student-data/student-data.component';
import { EmployerDataComponent } from './components/add-user-data/employer-data/employer-data.component';
import { UserdataService } from './services/userdata/userdata.service';
import { HttpClientModule } from '@angular/common/http';
import { CreatedUserComponent } from './components/created-user/created-user.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AddUserDataComponent,
    VerifyEmailComponent,
    StudentDataComponent,
    EmployerDataComponent,
    CreatedUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MaterialModule,
    AngularFireAuthModule,
    HttpClientModule,
  ], providers: [
    FirebaseService,
    UserdataService
  ]
})
export class AuthModule { }
