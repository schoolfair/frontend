import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserDataComponent } from './components/auth/add-user-data/add-user-data.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},

  // Authentication Routes

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'add-user-data', component: AddUserDataComponent, canActivate: [AuthGuard]},
  {path: 'verify-email', component: VerifyEmailComponent},

  // Student routes

  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
