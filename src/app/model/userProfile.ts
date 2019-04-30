export class UserProfile{
    firstName:string
    lastName:string
    mobile:Number
    email:string
    userId:string
  imagePath: String
    
  
  friends: String[]
  
  currentJob: String
  
  currentOrganisation:String

//   headLiner: String

  state:  String
    
  city:  String
  
  domain: String
  
//   followers: Number
  
  education: [
    {
      institutionName: String,
        
      degree: String,
      
      fieldOfStudy: String,
     
      location: String,
     
      startYear: Date,
      
      endYear:Date,
      
    //   societyAndActivities: String
      
    }
  ]
  skills:  String[]
    
  workExperience: [
    {
      companyName:  String
      
      location:  String
      
      startYear: Date
    
      endYear: Date
     designation: String
    jobDetails:String
    }
  ]
  certification: [
    {
      name: String
    
      description: String
    
      institutionName: String
      
      issueDate:  Date
    
      }]
  
//   post 
//     {
//       title: String
      
//       content: String
      
//     }



    }