import { Component, OnInit } from '@angular/core';
import { UserRegService } from 'src/app/Services/user-reg.service';
import { UserProfile } from 'src/app/model/userProfile';

@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.css']
})
export class FriendProfileComponent implements OnInit {

  loggedUserId = localStorage.getItem("loggedUserId");
  loggedUserProfile : UserProfile;

  constructor(    private userRegService: UserRegService
    ) { }

  ngOnInit() {
    this.userRegService.getProfile(localStorage.getItem("friendId")).subscribe(data => {
      this.loggedUserProfile = data;})
  }

}
