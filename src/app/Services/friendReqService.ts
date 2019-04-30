import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserProfile } from "../model/userProfile";
import { Follow } from '../model/follow';

@Injectable({
  providedIn: "root"
})
export class FriendReqService {
  baseurl = "http://localhost:3000/api/useProfile/";
  constructor(private http: HttpClient) {}
  getAllUserProfile() {
    return this.http.get<UserProfile[]>(this.baseurl + "getallProfiles");
  }
  sendFrndRequest(Newreq){
    return this.http.post(this.baseurl+"follow",Newreq);
  }
  getAllFrndRequest(){
    return this.http.get<Follow[]>(this.baseurl+"getfollow");
  }
  deleteFrndRequest(id){
    
    return this.http.delete(this.baseurl+"deleteFollow/"+id);
  }
}
