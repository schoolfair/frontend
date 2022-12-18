import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { Roles, User } from 'src/app/modules/auth/services/firebase/user';
import { UserdataService } from 'src/app/modules/auth/services/userdata/userdata.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {

  roles!: Roles
  userdata: any;

  constructor(
    private firebase: FirebaseService,
    private userdataService: UserdataService) { }

  ngOnInit(): void {
    this.firebase.user.subscribe((data: User|undefined) => {
      if (data) {

        if (data.roles) {
          this.roles = data.roles;
        }

        this.userdataService.UserData(data?.uid).subscribe((data: any | undefined) => {
          if (data) {
            this.userdata = data;
          }
          else {
            console.error("User data is undefined.")
          }
        });
      }
      else {
        console.error("User is undefined.")
      }
    })
  }

}
