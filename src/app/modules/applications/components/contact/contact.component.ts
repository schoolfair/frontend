import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { StudentDataModel } from 'src/app/modules/auth/models/user-data';
import { UserdataService } from 'src/app/modules/auth/services/userdata/userdata.service';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  student!: StudentDataModel

  constructor(
    private userDataService: UserdataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let studentId = this.activatedRoute.snapshot.params['id'];

    this.userDataService.GetById(studentId).pipe(first()).subscribe((data) => {
      this.student = data;
    })
  }


}
