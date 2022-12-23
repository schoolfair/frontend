import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserDataComponent } from './modules/auth/components/add-user-data/add-user-data.component';

import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';

import { HasRolesGuard } from './modules/auth/guards/role/has-roles/has-roles.guard';
import { AuthGuard } from './modules/auth/guards/auth/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},

  // Authentication routes

  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },

  // Student routes

  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, HasRolesGuard]},

  // basic user routes (e.g. profile, change profile)

  { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule), canActivate: [AuthGuard, HasRolesGuard] },

  // opportunity listings

  { path: 'listings', loadChildren: () => import('./modules/listings/listings.module').then(m => m.ListingsModule), canActivate: [AuthGuard, HasRolesGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
