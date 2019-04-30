import { Component, OnInit } from "@angular/core";
import { UserProfile } from "src/app/model/userProfile";
import { Router } from "@angular/router";
import { FriendReqService } from "src/app/Services/friendReqService";
import { UserRegService } from "src/app/Services/user-reg.service";

@Component({
  selector: "app-search-friend",
  templateUrl: "./search-friend.component.html",
  styleUrls: ["./search-friend.component.css"]
})
export class SearchFriendComponent implements OnInit {
  userSuggestions: UserProfile[]=[];
  loggedUserProfile: UserProfile;

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
      this.userRegService
        .getProfile(localStorage.getItem("searchfriend"))
        .subscribe(data => {
          this.userSuggestions.push(data)
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
