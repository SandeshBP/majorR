import { Component, OnInit } from "@angular/core";
import { UserMessageService } from "src/app/Services/user-msg.service";
import { User, Message } from "src/app/model/user-model";
import { UserRegService } from "src/app/Services/user-reg.service";
import { UserProfile } from "src/app/model/userProfile";
@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  user: UserProfile[] = [];
  msg: Message = new Message();
  receiverId: string;
  senderId = (localStorage.getItem("loggedUserId"));
  messsageArray: Message[] = [];
  displayMsgArray: Message[] = [];
  recentMessages: Message[] = [];
  recentUsers: UserProfile[] = [];
  date = new Date();
  constructor(
    private messService: UserMessageService,
    private userRegService: UserRegService
  ) {}

  ngOnInit() {
    this.getAllData(null);
  }
  getAllData(id) {
    this.recentMessages = [];
    this.recentUsers = [];
    this.userRegService.getAllProfile().subscribe(data => {
      this.user = data.filter(
        u => u.userId !== this.senderId
      );
      this.messService.retriveMsg().subscribe(data => {
        this.messsageArray = data;

        for (let msg = this.messsageArray.length - 1; msg >= 0; msg--) {
          for (let u of this.user) {
            if (this.recentUsers.indexOf(u) > -1) {
              continue;
            }
            if (
              u.userId == this.messsageArray[msg].receiver ||
              u.userId == this.messsageArray[msg].sender
            ) {
              this.recentMessages.push(this.messsageArray[msg]);
              this.recentUsers.push(u);
              break;
            }
          }
        }
        for (let u of this.user) {
          if (this.recentUsers.indexOf(u) > -1) {
            continue;
          }
            this.recentUsers.push(u);
        }
      });
    });
    this.idStore(id);
  }
  idStore(id) {
    this.receiverId = id;
 
    this.displayMessage();
  }
  sendMsg(message) {
    this.msg.msg = message;
    this.msg.sender = (localStorage.getItem("loggedUserId"));
    this.msg.receiver = this.receiverId;
    this.msg.TimeNdate = this.date;

    this.messService.storeMsg(this.msg).subscribe(data => {
      this.idStore(this.receiverId);
    });
    this.getAllData(this.receiverId);
  }

  displayMessage() {
    this.displayMsgArray = [];
    this.messService.retriveMsg().subscribe(data => {
      this.messsageArray = data;

      for (let varMessage of this.messsageArray) {
        if (
          (varMessage.sender == this.senderId &&
            varMessage.receiver == this.receiverId) ||
          (varMessage.sender == this.receiverId &&
            varMessage.receiver == this.senderId)
        ) {
          this.displayMsgArray.push(varMessage);
        }
      }
    });
  }
}
