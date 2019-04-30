import { Component, OnInit } from "@angular/core";
import { UserProfile } from "src/app/model/userProfile";
import { Follow } from "src/app/model/follow";
import { Router } from "@angular/router";
import { FriendReqService } from "src/app/Services/friendReqService";
import { UserRegService } from "src/app/Services/user-reg.service";

@Component({
  selector: "app-invitations",
  templateUrl: "./invitations.component.html",
  styleUrls: ["./invitations.component.css"]
})
export class InvitationsComponent implements OnInit {
  loggedUserId = localStorage.getItem("loggedUserId");
  loggedUserProfile : UserProfile;

  newFriendProfile = new UserProfile();

  allUserProfiles: UserProfile[] = [];
  allfollows: Follow[] = [];

  reqSentUsers: UserProfile[] = [];
  recentRequests: Follow[] = [];
  constructor(
    private router: Router,
    private fdReqService: FriendReqService,
    private userRegService: UserRegService
  ) {
    // this.loggedUserProfile.friends = [];
    // this.newFriendProfile.friends = [];
  }

  ngOnInit() {
    this.reqSentUsers = [];
    this.recentRequests = [];
    this.userRegService.getAllProfile().subscribe(data => {
      this.allUserProfiles = data.filter(u => u.userId !== this.loggedUserId);

      this.fdReqService.getAllFrndRequest().subscribe(response => {
        this.allfollows = response;

        for (let flw = this.allfollows.length - 1; flw >= 0; flw--) {

          for (let u of this.allUserProfiles) {
            if (this.reqSentUsers.indexOf(u) > -1) {
              continue;
            }
            if (
              u.userId == this.allfollows[flw].reqSentBy &&
              this.loggedUserId == this.allfollows[flw].reqSentTo
            ) {
              this.recentRequests.push(this.allfollows[flw]);
              this.reqSentUsers.push(u);
              break;
            }
          }
        }

      });
    });
  }

  accept(id, reqObj) {
    this.userRegService.getProfile(this.loggedUserId).subscribe(data => {
      this.loggedUserProfile = data;
    });
    this.userRegService.getProfile(id).subscribe(data => {
      this.newFriendProfile = data;
      this.updateUsers(id, reqObj)
    });

  
  }
  updateUsers(id, reqObj){
      this.loggedUserProfile.friends.push(id);
    this.newFriendProfile.friends.push(this.loggedUserId);

    this.userRegService
      .updateProfile(this.loggedUserProfile, this.loggedUserId)
      .subscribe(data => {});
    this.userRegService
      .updateProfile(this.newFriendProfile, id)
      .subscribe(data => {});
    this.fdReqService.deleteFrndRequest(reqObj._id).subscribe(data => {});
  }
  reject(reqObj) {
    this.fdReqService.deleteFrndRequest(reqObj._id).subscribe(data => {});
  }
}
