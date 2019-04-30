import { Component, OnInit } from "@angular/core";
import { UserRegService } from "src/app/Services/user-reg.service";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { UserProfile } from "src/app/model/userProfile";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;
  userProfile=new UserProfile()
  submitted: boolean = false;

  message: string;

  flag: boolean;
  registeredUser: any;

  constructor(private userRegService: UserRegService, private router: Router) {}

  ngOnInit() {
    this.regForm = new FormGroup({
      firstName: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Z][a-z]+")
      ]),

      lastName: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Z][a-z]+")
      ]),

      mobile: new FormControl("", [
        Validators.required,
        Validators.pattern("[6-9][0-9]{9}")
      ]),

      email: new FormControl("", [
        Validators.required,

        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
      ]),

      password: new FormControl("", [Validators.required])
    });
  }

  register(confirmPassword) {
    this.message = "";
    this.submitted = true;

    if (this.regForm.invalid) {
      return;
    }

    this.flag = false;

    if (this.regForm.value.password == confirmPassword) {
      this.userRegService.register(this.regForm.value).subscribe(data => {
        this.registeredUser = data;
        console.log(this.registeredUser);
        if (this.registeredUser._id) {
          this.userProfile.userId=this.registeredUser._id
          this.userProfile.firstName=this.registeredUser.firstName
          this.userProfile.lastName=this.registeredUser.lastName
          this.userProfile.email=this.registeredUser.email
          this.userProfile.mobile=this.registeredUser.mobile


          this.userRegService.creatProfile(this.userProfile).subscribe(data=>{})
          alert("Successfully Registered");
          this.router.navigate(["login"]);
        }
         else if (this.registeredUser.email) {
          alert(this.registeredUser.email);
        }
      });
    } else {
      this.message = "Password not matching..! \n Please confirm password";

      this.flag = true;
    }
  }
}