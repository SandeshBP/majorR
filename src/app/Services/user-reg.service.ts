import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserProfile } from "../model/userProfile";

@Injectable({
  providedIn: "root"
})
export class UserRegService {
  baseurl = "http://localhost:3000/api/users/";
  constructor(private http: HttpClient) {}

  register(userData: UserProfile) {
    return this.http.post<{
      email: "";
      user: "";
    }>("http://localhost:3000/api/users/register", userData);
  }
  login(loginData) {
    return this.http.post<{
      msg: "";
      email: "";
      password: "";
    }>("http://localhost:3000/api/users/login", loginData);
  }

  creatProfile(userProfile) {
    console.log(userProfile);
    return this.http.post(
      "http://localhost:3000/api/useProfile/creatProfile",
      userProfile
    );
  }
  getAllProfile() {
  
    return this.http.get<UserProfile[]>(
      "http://localhost:3000/api/useProfile/getallProfiles"
    );
  }
  getProfile(id) {
  
    return this.http.get<UserProfile>(
      "http://localhost:3000/api/useProfile/getProfile/"+id
    );
  }

  updateProfile(userProfile,id) {
  
    return this.http.put("http://localhost:3000/api/useProfile/updateProfile/"+id,userProfile);
  }
}
