import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserRegService } from 'src/app/Services/user-reg.service';
import { UserProfile } from 'src/app/model/userProfile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})
export class AddExperienceComponent implements OnInit {
  experienceForm:FormGroup;
  submitted:boolean=false
  experience=    {
    companyName:  "",
    
    location:  "",
    
    startYear: new Date(),
  
    endYear: new Date(),
   designation: "",
  jobDetails:""
  }
  loggedUserId = localStorage.getItem("loggedUserId");
  loggedUserProfile : UserProfile;

  constructor(private userRegService: UserRegService,private router: Router) { }


  ngOnInit() {
    this.experienceForm = new FormGroup({
      companyName: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Z][a-z]+")
      ]),

      location: new FormControl("", [
        Validators.required
      ]),
       startYear: new FormControl("", [
        Validators.required
       ] ),
       endYear: new FormControl("", [
        Validators.required
       ] ),
       designation: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Z][a-z]+")
      ]),
      jobDetails: new FormControl("", [
        Validators.required
      ])
  })
  }

  onSubmit(){
    this.submitted=true
    
    this.userRegService.getProfile(this.loggedUserId).subscribe(data => {
      console.log(this.loggedUserProfile)
      this.loggedUserProfile = data;

        this.experience.companyName=this.experienceForm.value.companyName,
        this.experience.location=  this.experienceForm.value.location,
        this.experience.startYear= this.experienceForm.value.startYear, 
        this.experience.endYear= this.experienceForm.value.endYear,
        this.experience.designation= this.experienceForm.value.designation,
        this.experience.jobDetails=this.experienceForm.value.jobDetails
      
      this.loggedUserProfile.workExperience.push(this.experience)

      this.userRegService
      .updateProfile(this.loggedUserProfile, this.loggedUserId)
      .subscribe(data => {    this.router.navigate(['profile'])
    });
    });
    
  }

}
