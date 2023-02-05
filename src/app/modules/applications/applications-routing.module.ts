import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth/auth.guard';
import { EmployerGuard } from '../auth/guards/role/employer/employer.guard';
import { StudentGuard } from '../auth/guards/role/student/student.guard';
import { ApplicationComponent } from './components/application/application.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { ApplyComponent } from './components/apply/apply.component';
import { ContactComponent } from './components/contact/contact.component';
import { ViewApplicationsComponent } from './components/view-applications/view-applications.component';

const routes: Routes = [
  { path: 'applications', component: ApplicationsComponent, canActivate: [StudentGuard]},
  { path: 'apply/:uid', component: ApplyComponent, canActivate: [StudentGuard] },
  { path: 'view-applications/:uid', component: ViewApplicationsComponent, canActivate: [EmployerGuard]},
  { path: 'app/:id', component: ApplicationComponent },
  { path: 'contact/:id', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
