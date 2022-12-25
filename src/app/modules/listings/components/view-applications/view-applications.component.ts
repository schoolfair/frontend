import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { first, Observable, take, tap } from 'rxjs';
import { Application } from 'src/app/modules/applications/models/application';
import { ApplicationService } from 'src/app/modules/applications/services/application/application.service';
import { StudentDataModel, UserDataModel } from 'src/app/modules/auth/components/add-user-data/user-data';
import { FirebaseService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { User } from 'src/app/modules/auth/services/firebase/user';
import { UserdataService } from 'src/app/modules/auth/services/userdata/userdata.service';

@Component({
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.scss']
})
export class ViewApplicationsComponent implements OnInit {

  applications: Application[] = [];
  users: StudentDataModel[] = [];

  constructor(
    private applicationsService: ApplicationService,
    private firebase: FirebaseService,
    private userData: UserdataService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    const _id = this.route.snapshot.paramMap.get('id');

    this.applicationsService.Get().subscribe((data: Application[]) => {

      data = data.filter((d: Application) => d.listingId == _id);

      console.log(data);

      this.applications = data;

      data.forEach((app: Application, i) => {
        this.userData.GetById(app.userId).pipe(take(1)).subscribe((data: any) => {
          this.users[i] = data as StudentDataModel;
        });
      })

    });

  }

  gotoApplication(uid:string | undefined) {
    if (uid) {
      this.router.navigate(['applications', 'app', uid]);
    }
  }

  gotoUser(uid: string | undefined) {
    if (uid) {
      this.router.navigate(['user', 'profile', uid]);
    }
  }

}
