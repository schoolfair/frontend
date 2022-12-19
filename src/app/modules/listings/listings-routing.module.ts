import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployerGuard } from '../auth/guards/role/employer/employer.guard';
import { CreateListingComponent } from './components/create-listing/create-listing.component';
import { ListingComponent } from './components/listing/listing.component';
import { ListingsComponent } from './components/listings/listings.component';

const routes: Routes = [

  // everyone should be able to view listings
  // employers should be able to create, update, and delete listings
  // students should be able to apply

  { path: '', component: ListingsComponent },

  { path: 'create', component: CreateListingComponent, canActivate: [EmployerGuard]},

  { path: 'listing/:id', component: ListingComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingsRoutingModule { }
