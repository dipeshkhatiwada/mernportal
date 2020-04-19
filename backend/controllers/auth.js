const User = require("../models/user");
const { check, validationResult} = require('express-validator');
const formidable = require("formidable");
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const _ = require("lodash");
const fs = require("fs");
const path = require('path');
exports.signup = (req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(422).json({
          error:{
              parms:errors.array()[0].param,
              title:errors.array()[0].msg,
          }
      })
  }

  const user = new User(req.body)
  user.save((err, user)=>{
      if(err){
          return res.status(400).json({
              err:"NOT able to save user in DB"
          })
      }
      res.json({
          name:user.name,
          email:user.email,
          id:user._id,
      });
  })

};

exports.signin = (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;
  
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg
      });
    }
  
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "USER email does not exists"
        });
      }
  
      if (!user.autheticate(password)) {
        return res.status(401).json({
          error: "Email and password do not match"
        });
      }
      if(!user.status){
        return res.status(401).json({
          error: "Account suspended"
        });
      }
      //create token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);
      //put token in cookie
      res.cookie("token",token,{expire: new Date()+9999});
      //send response to frontend
      const {_id,name,email,admin} = user;
      return res.json({token,user:{_id,name,email,admin}});
    });
  };

exports.signout = (req,res)=>{
  res.clearCoookie("token");
  res.json({
      message:"Uer sign out successfully"
  });
};


// protected routes MIDDLEWARE
exports.isSignedIn = expressJwt({
  secret:process.env.SECRET,
  userProperty: "auth"
});

// custom middlewares
exports.isAuthenticated = (req,res,next)=>{
  let checker = req.user && req.auth && req.user._id==req.auth._id;
  if(!checker){
    return res.status(403).json({
      error:"ACCESS DENIED"
    });
  }
  next();
}
exports.isAdmin = (req,res,next)=>{
  if(!req.user.admin){
    return res.status(403).json({
      error:"You are not ADMIN"
    });
  }
  next();
}
