import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProfile } from 'src/app/model/userProfile';
import { UserRegService } from 'src/app/Services/user-reg.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css']
})
export class CertificationsComponent implements OnInit {
  certificationForm: FormGroup;
  submitted: boolean = false;
  certification={
    name: "",
  
    description: "",
  
    institutionName: "",
    
    issueDate:  new Date(),
  
    }
    loggedUserId = localStorage.getItem("loggedUserId");
    loggedUserProfile : UserProfile;
    constructor(private userRegService: UserRegService,private router: Router) { }
    
  ngOnInit() {
    this.certificationForm = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Z][a-z]+")
      ]),

      institutionName: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Z][a-z]+")
      ]),
      description: new FormControl("", [
        Validators.required
      ]),

      issueDate: new FormControl("", [
        Validators.required
       ] )
     

  })
  }
  onSubmit (){
this.submitted=true;

this.userRegService.getProfile(this.loggedUserId).subscribe(data => {
  console.log(this.loggedUserProfile)
  this.loggedUserProfile = data;

    this.certification.name=this.certificationForm.value.name,
    this.certification.description=this.certificationForm.value.description,
    this.certification.institutionName= this.certificationForm.value.institutionName,
    this.certification.issueDate=  this.certificationForm.value.issueDate,
    

  this.loggedUserProfile.certification.push(this.certification)

  this.userRegService
  .updateProfile(this.loggedUserProfile, this.loggedUserId)
  .subscribe(data => {
    this.router.navigate(['profile'])

  });
});
  }
}
