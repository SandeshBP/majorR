import { Component, OnInit } from '@angular/core';
import { UserRegService } from 'src/app/Services/user-reg.service';
import { UserProfile } from 'src/app/model/userProfile';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedUserId = localStorage.getItem("loggedUserId");
  loggedUserProfile : UserProfile;

  constructor(    private userRegService: UserRegService
    ) { }

  ngOnInit() {
    this.userRegService.getProfile(this.loggedUserId).subscribe(data => {
      this.loggedUserProfile = data;})
  }

}
