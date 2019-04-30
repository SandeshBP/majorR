import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProfile } from 'src/app/model/userProfile';
import { UserRegService } from 'src/app/Services/user-reg.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addeducation',
  templateUrl: './addeducation.component.html',
  styleUrls: ['./addeducation.component.css']
})
export class AddeducationComponent implements OnInit {
educationForm:FormGroup
submitted:boolean=false
education={
  institutionName: "",
    
  degree: "",
  
  fieldOfStudy: "",
 
  location: "",
 
  startYear: new Date(),
  
  endYear:new Date(),
  

  
}
loggedUserId = localStorage.getItem("loggedUserId");
loggedUserProfile : UserProfile;
constructor(private userRegService: UserRegService,private router: Router) { }

  ngOnInit() {
    this.educationForm = new FormGroup({
      institutionName: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Z][a-z]+")
      ]),

      degree: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Z][a-z]+")
      ]),
      fieldOfStudy: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Z][a-z]+")
      ]),

      location: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Z][a-z]+")
       ] ),
       startYear: new FormControl("", [
        Validators.required,
        Validators.minLength(2000),
        Validators.maxLength(2020)
       ] ),
       endYear: new FormControl("", [
        Validators.required
       ] )
       
     

  })
  }
  onSubmit(){
    this.submitted=true;

    this.userRegService.getProfile(this.loggedUserId).subscribe(data => {
      console.log(this.loggedUserProfile)
      this.loggedUserProfile = data;

        this.education.institutionName=this.educationForm.value.institutionName,
        this.education.degree=this.educationForm.value.degree,
        this.education.fieldOfStudy= this.educationForm.value.fieldOfStudy,
        this.education.location=  this.educationForm.value.location,
        this.education.startYear= this.educationForm.value.startYear, 
        this.education.endYear= this.educationForm.value.endYear,
        

      this.loggedUserProfile.education.push(this.education)

      this.userRegService
      .updateProfile(this.loggedUserProfile, this.loggedUserId)
      .subscribe(data => {    this.router.navigate(['profile'])
    });
    });
  }

}
