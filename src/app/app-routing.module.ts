import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserDataComponent } from './modules/auth/components/add-user-data/add-user-data.component';

import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';

import { HasRolesGuard } from './modules/auth/guards/role/has-roles/has-roles.guard';
import { AuthGuard } from './modules/auth/guards/auth/auth.guard';
import { UpgradeComponent } from './components/upgrade/upgrade.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsComponent } from './components/terms/terms.component';
import { ProductsComponent } from './components/products/products.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},

  {path: 'upgrade', component: UpgradeComponent, canActivate: [AuthGuard, HasRolesGuard]},

  // Authentication routes

  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },

  // Student routes

  {path: 'dashboard', redirectTo: '/'},

  // basic user routes (e.g. profile, change profile)

  { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule), canActivate: [AuthGuard, HasRolesGuard] },

  // opportunity listings

  { path: 'listings', loadChildren: () => import('./modules/listings/listings.module').then(m => m.ListingsModule), canActivate: [AuthGuard, HasRolesGuard] },

  // application listings

  { path: 'applications', loadChildren: () => import('./modules/applications/applications.module').then(m => m.ApplicationsModule), canActivate: [AuthGuard, HasRolesGuard] },

  // information pages

  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'about-us', component: AboutComponent },
  { path: 'contact-us', component: ContactComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
