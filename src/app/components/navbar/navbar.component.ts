import { Component, OnInit } from '@angular/core';
import { UserRegService } from 'src/app/Services/user-reg.service';
import { FriendReqService } from 'src/app/Services/friendReqService';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/model/userProfile';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedUserId =localStorage.getItem("loggedUserId")
  allUserProfiles: UserProfile[]=[];

  constructor(private router: Router,
    private userRegService: UserRegService) { }

  ngOnInit() {
  }
  searchFriend(friendemail){
    this.userRegService.getAllProfile().subscribe(data => {
      this.allUserProfiles = data.filter(u => u.userId !== this.loggedUserId);
      for(let u of this.allUserProfiles){
        if(u.email==friendemail){
          localStorage.setItem("searchfriend",u.userId)
          this.router.navigate(["searchfriend"])
        }
      }
  }
    )

}
}
