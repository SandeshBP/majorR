import { Component, OnInit } from "@angular/core";
import { UserProfile } from "src/app/model/userProfile";
import { UserRegService } from "src/app/Services/user-reg.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-recommendation",
  templateUrl: "./recommendation.component.html",
  styleUrls: ["./recommendation.component.css"]
})
export class RecommendationComponent implements OnInit {
  loggedUserId = localStorage.getItem("loggedUserId");
  loggedUserProfile: UserProfile;
friends:UserProfile[]=[]
  constructor(private userRegService: UserRegService,    private router: Router,
    ) {}

  ngOnInit() {
    this.userRegService.getProfile(this.loggedUserId).subscribe(data => {
      this.loggedUserProfile = data;
      
        for (let recomm of this.loggedUserProfile.friends) {
          this.userRegService.getProfile(recomm).subscribe(data => {
            this.friends.push(data)
          });
        
      }
    });
  }
  friendProfile(id){
localStorage.setItem("friendId",id)
this.router.navigate(["friendprofile"])
  }
}
