import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { StudentDataModel } from 'src/app/modules/auth/models/user-data';
import { AuthService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { User } from 'src/app/modules/auth/services/firebase/user';
import { UserdataService } from 'src/app/modules/auth/services/userdata/userdata.service';
import { Application } from '../../models/application';
import { ApplicationService } from '../../services/application/application.service';

interface Student {
  studentId: string;
  data: StudentDataModel;
}

@Component({
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.scss']
})
export class ViewApplicationsComponent implements OnInit {

  displayedColumns = ['name', 'description', 'skills', 'status', 'info', 'contact'];

  listingId!: string;


  applications!: Application[];
  students: Student[] = []

  studentIds: Set<string> = new Set<string>();

  constructor(
    private firebase: AuthService,
    private applicationService: ApplicationService,
    private studentService: UserdataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.listingId = this.route.snapshot.paramMap.get('uid')!;

    this.firebase.user.subscribe((user?: User) => {
      if (user) {
        this.applicationService.Get().pipe(first()).subscribe((data?: Application[]) => {
          if (data) {
            this.applications = data.filter(app => app.listingId == this.listingId);

            this.applications.forEach((app) => {
              this.studentIds.add(app.userId);
            })

            this.studentIds.forEach((studentId) => {
              this.studentService.GetById(studentId).pipe(first()).subscribe((studentData?: StudentDataModel) => {
                if (studentData) {
                  this.students.push({studentId: studentId, data: studentData});
                }
              });
            });
          }
        });
      }
    })
  }

  gotoApplication(application: Application) {
    this.router.navigate(['applications', 'app', application.uid]);
  }

  gotoContactPage(application: Application) {
    this.router.navigate(['applications', 'contact', application.userId]);
  }

  getStudent(app: Application) {
    return this.students.find(student => student.studentId === app.userId);
  }

}
