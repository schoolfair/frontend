import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth/auth.guard';
import { EmployerGuard } from '../auth/guards/role/employer/employer.guard';
import { StudentGuard } from '../auth/guards/role/student/student.guard';
import { ApplyComponent } from './components/apply/apply.component';
import { ViewApplicationsComponent } from './components/view-applications/view-applications.component';

const routes: Routes = [
  { path: 'apply/:uid', component: ApplyComponent, canActivate: [AuthGuard, StudentGuard] },
  { path: 'view-applications/:uid', component: ViewApplicationsComponent, canActivate: [AuthGuard, EmployerGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
