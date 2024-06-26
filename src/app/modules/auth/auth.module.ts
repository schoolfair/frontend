import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './services/firebase/firebase.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddUserDataComponent } from './components/add-user-data/add-user-data.component';
import { MaterialModule } from '../material/material.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { StudentDataComponent } from './components/add-user-data/student-data/student-data.component';
import { EmployerDataComponent } from './components/add-user-data/employer-data/employer-data.component';
import { UserdataService } from './services/userdata/userdata.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './guards/auth/auth.guard';
import { NoRolesGuard } from './guards/role/no-roles/no-roles.guard';
import { HasRolesGuard } from './guards/role/has-roles/has-roles.guard';
import { EmployerGuard } from './guards/role/employer/employer.guard';
import { StudentGuard } from './guards/role/student/student.guard';
import { SubscriptionService } from './services/subscription/subscription.service';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AddUserDataComponent,
    StudentDataComponent,
    EmployerDataComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MaterialModule,
    AngularFireAuthModule,
    HttpClientModule,
    SharedModule
  ], providers: [
    AuthService,
    UserdataService,
    SubscriptionService,
    AuthGuard,
    NoRolesGuard,
    HasRolesGuard,
    EmployerGuard,
    StudentGuard,
  ]
})
export class AuthModule { }
