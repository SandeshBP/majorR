import { Component, OnInit } from "@angular/core";
import { UserProfile } from "src/app/model/userProfile";
import { Router } from "@angular/router";
import { FriendReqService } from "src/app/Services/friendReqService";
import { Follow } from "src/app/model/follow";
import { UserRegService } from "src/app/Services/user-reg.service";

@Component({
  selector: "app-friendlist",
  templateUrl: "./friendlist.component.html",
  styleUrls: ["./friendlist.component.css"]
})
export class FriendlistComponent implements OnInit {
  userSuggestions: UserProfile[] = [];
  users: UserProfile[] = [];
  loggedUserProfile: UserProfile;
  mutualFriend: UserProfile;

  loggedUserId = localStorage.getItem("loggedUserId");
  newFdReq = {
    reqSentBy: "",
    reqSentTo: ""
  };

  constructor(
    private router: Router,
    private fdReqService: FriendReqService,
    private userRegService: UserRegService
  ) {}

  ngOnInit() {
    if (this.loggedUserId) {
      this.userRegService.getProfile(this.loggedUserId).subscribe(data => {
        this.loggedUserProfile = data;

        this.fdReqService.getAllUserProfile().subscribe(data => {
          this.users = data.filter(u => u.userId !== this.loggedUserId);
          for (let u of this.users) {
            if (this.loggedUserProfile.friends.indexOf(u.userId) > -1) {
              for (let mutual of u.friends) {
                this.userRegService.getProfile(mutual).subscribe(data => {
                  if(data.userId!=this.loggedUserId){
                  this.mutualFriend = data;
                  if (
                    this.userSuggestions.indexOf(this.mutualFriend) == -1 
                  ) {
                    this.userSuggestions.push(this.mutualFriend);
                  }
                }
                });
              }
            }
          }
          console.log(this.userSuggestions);
        });
      });
    } else {
      this.router.navigate(["login"]);
    }
  }
  sendRequest(followed) {
    this.newFdReq.reqSentBy = this.loggedUserId;
    this.newFdReq.reqSentTo = followed;
    this.fdReqService.sendFrndRequest(this.newFdReq).subscribe(response => {});
  }
}
