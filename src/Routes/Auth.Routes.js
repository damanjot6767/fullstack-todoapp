const express = require("express");
const UserModel = require("../modals/user.model");
const jwt = require("jsonwebtoken")
require("dotenv").config();

const SECRET=process.env.SECRET;
const REFRESH=process.env.REFRESH;

const AuthRouter = express.Router();

//for reguster
AuthRouter.post("/register",async(req,res)=>{
    const{name,password,email,username}=req.body;
   try{
    const user = new UserModel({name,password,email,username});
    await user.save();
    res.status(201).send("Registeration Successful")
   }
   catch(err){
    res.send(err.message)
   }
})

//for login
AuthRouter.post("/login",async(req,res)=>{
    const{password,email}=req.body;
    console.log(password,email)
    try{
        const user = await UserModel.findOne({email,password});
    if(user){
        const token = jwt.sign({id:user._id,name:user.name,email:user.email,username:user.username},SECRET,{expiresIn:"7 days"});
        // const Refreshtoken = jwt.sign({id:user._id,name:user.name,email:user.email,username:user.username},REFRESH,{expiresIn:"28 days"});
        return res.status(200).send({message:"login success",token:token,userid:user._id})
    }
    return res.status(401).send("user not found invalid details")
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

AuthRouter.get("/logout",async(req,res)=>{
    try{
        console.log("yes")
            return res.status(201).send("logout")
    }
    catch(err){
        if(err.message==="token expired"){
            blacklist.push(token)
        }
        return res.status(400).send(err.message)
    }
})
module.exports=AuthRouter