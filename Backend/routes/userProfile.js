const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile Model
const UserProfile = require("../model/UserProfile");
// Load User Model
const User = require("../model/User");
//============================================================================
router.post("/creatProfile",(req,res,next)=>{
  console.log(req.body)
  let ipPofile= new UserProfile();
  ipPofile.userId=req.body.userId
  ipPofile.firstName=req.body.firstName
  ipPofile.lastName=req.body.lastName
  ipPofile.email=req.body.email
  ipPofile.mobile=req.body.mobile



ipPofile.save((err,profile)=>{
  if(err){
      res.json(err)
      console.log(err)
  }
  else{
      res.json({msg:"inserted",profile})
      console.log(123)

  }
})
});


//=========================================================================================
router.get("/getallProfiles",(req,res,next)=>{

  UserProfile.find((err,profile)=>{
  if(err){
      res.json(err)
      console.log(err)
  }
  else{
      res.json(profile)
      

  }
})
});
//========================================================================================
//get by id 
router.get("/getProfile/:id",(req,res,next)=>{

  UserProfile.findOne({userId:req.params.id},(err,profile)=>{
  if(err){
      res.json(err)
      console.log(err)
  }
  else{
    console.log(profile)
      res.json(profile)
      

  }
})
});
//===============================================================================================

router.put("/updateProfile/:id",(req,res,next)=>{
  UserProfile.findOneAndUpdate({userId:req.params.id},req.body,(err,profile)=>{
  if(err){
      res.json(err)
      console.log(err)
  }
  else{
      res.json(profile)
      

  }
})
});









































module.exports = router;
