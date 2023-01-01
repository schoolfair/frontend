import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserdataService } from 'src/app/modules/auth/services/userdata/userdata.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  uid!: string;

  userData!: any;

  constructor(
    private route: ActivatedRoute,
    private userDataService: UserdataService
  ) { }

  ngOnInit(): void {
    this.uid = this.route.snapshot.params['id']

    if (!this.uid) {
      console.error("No uid provided");
    }

    this.userDataService.GetById(this.uid).subscribe((data: any) => {
      if (data) {
        this.userData = data;
      }
    });
  }

}
