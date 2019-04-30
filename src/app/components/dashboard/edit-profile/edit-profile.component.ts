import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProfile } from 'src/app/model/userProfile';
import { UserRegService } from 'src/app/Services/user-reg.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  submitted: boolean = false;
  profile:{
    firstName:"",
    lastName:"",
    mobile:"",
    email:"",
    userId:"",
    // friends: String[]
    currentJob: "",
    currentOrganisation:"",
    state:  "",
    city:  "",
    domain: "",
  }
  selectedDomain
  loggedUserId = localStorage.getItem("loggedUserId");
    loggedUserProfile : UserProfile;
  constructor(private userRegService: UserRegService,private router: Router) { }

  ngOnInit() {
   
  this.userRegService.getProfile(this.loggedUserId).subscribe(data => {
    this.loggedUserProfile = data;
    this.profileForm = new FormGroup({
      firstName: new FormControl(`${this.loggedUserProfile.firstName}`, [
        Validators.required,
        Validators.pattern("[A-Z][a-z]+")
      ]),
      lastName: new FormControl(`${this.loggedUserProfile.lastName}`,[
        Validators.required,
        Validators.pattern("[A-Z][a-z]+")
      ]),
      mobile: new FormControl(`${this.loggedUserProfile.mobile}`, [
        Validators.required,
        Validators.pattern("[6-9][0-9]{9}")
      ]),
      email: new FormControl(`${this.loggedUserProfile.email}`, [
        Validators.required,

        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
      ]),

       password: new FormControl("", [Validators.required]),
      
      imagePath: new FormControl(""),

      currentJob: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Z][a-z]+")
      ]),

      currentOrganisation: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Z][a-z]+")
      ]),
      state: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Z][a-z]+")
      ]),
      city: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Z][a-z]+")
      ]),
      domain: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Z][a-z]+")
      ])
     

  })
  })
  }
  selectChange(event){

    this.selectedDomain=event.target.value
  }
  onSubmit (){
this.submitted=true;

this.userRegService.getProfile(this.loggedUserId).subscribe(data => {
  console.log(this.loggedUserProfile)
  this.loggedUserProfile = data;

    this.loggedUserProfile.firstName=this.profileForm.value.firstName,
    this.loggedUserProfile.lastName=this.profileForm.value.lastName,
    this.loggedUserProfile.mobile= this.profileForm.value.mobile,
    this.loggedUserProfile.email=  this.profileForm.value.email,
    this.loggedUserProfile.userId=this.profileForm.value.userId,
    this.loggedUserProfile.currentJob=this.profileForm.value.currentJob,
    this.loggedUserProfile.currentOrganisation= this.profileForm.value.currentOrganisation,
    this.loggedUserProfile.state=  this.profileForm.value.state,
    this.loggedUserProfile.city=this.profileForm.value.city,
    this.loggedUserProfile.domain=this.selectedDomain

    


  this.userRegService
  .updateProfile(this.loggedUserProfile, this.loggedUserId)
  .subscribe(data => {
    this.router.navigate(['profile'])
  });
});
  }
  }



