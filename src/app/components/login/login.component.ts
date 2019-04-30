import { Component, OnInit } from "@angular/core";
import { UserRegService } from "src/app/Services/user-reg.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginResponse = {
    msg: "",
    email: "",
    password: ""
  };
  submitted: boolean = false;

  constructor(private userRegService: UserRegService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,

        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
      ]),

      password: new FormControl("", [Validators.required])
    });
  }

  onSubmit() {
    this.loginResponse = {
      msg: "",
      email: "",
      password: ""
    };
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.userRegService.login(this.loginForm.value).subscribe(data => {
        this.loginResponse = data;
        console.log(this.loginResponse);
        if (this.loginResponse.msg) {
          localStorage.setItem("loggedUserId", this.loginResponse.msg);
          this.router.navigate(["home"]);
        }
      });
    }
  }
}
