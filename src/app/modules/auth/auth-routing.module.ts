import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserDataComponent } from './components/add-user-data/add-user-data.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { NoRolesGuard } from './guards/role/no-roles/no-roles.guard';
import { UnloggedGuard } from './guards/role/unlogged/unlogged.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [UnloggedGuard] },
  { path: 'add-user-data', component: AddUserDataComponent, canActivate: [AuthGuard, NoRolesGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
