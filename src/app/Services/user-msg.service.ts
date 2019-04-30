import { Injectable } from "@angular/core";

// import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient } from "@angular/common/http";
import { User } from "../model/user-model";
import { Message } from "../model/user-model";
@Injectable({
  providedIn: "root"
})
export class UserMessageService {
  baseurl = "http://localhost:3000/api/useProfile/";

  constructor(private http: HttpClient) {}

  storeMsg(msg: Message) {
    return this.http.post(this.baseurl + "message", msg);
  }

  retriveMsg() {
    return this.http.get<Message[]>(this.baseurl + "getMessages");
  }
}
