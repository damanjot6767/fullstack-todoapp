const express = require("express");
const jwt = require("jsonwebtoken");
const PostModel = require("../modals/post.model");
require("dotenv").config();

const SECRET=process.env.SECRET;
const REFRESH=process.env.REFRESH;
let blacklist=[];

const PostRouter = express.Router();
//add post
PostRouter.post("/addpost",async(req,res)=>{
    const{title}=req.body;
    const token = req.headers["authorization"];

    if(blacklist.includes(token)){
        return res.send("token already used")
    }
    if(!token){
        return res.send("Unauthorized")
    }
    try{
        const verification = jwt.verify(token,SECRET);
        if(verification){
            const userid = verification.id;
            const NewPost = new PostModel({userid:userid,title:title})
            await NewPost.save()
            const Posts = await PostModel.find()
            return res.status(201).send(Posts)
        }
        return res.status(401).send("invalid token")
    }
    catch(err){
        blacklist.push(token)
        return res.status(400).send(err.message)
    }
})

//getPost
PostRouter.get("/getpost",async(req,res)=>{
    const token = req.headers["authorization"];

    if(blacklist.includes(token)){
        return res.send("token already used")
    }
    if(!token){
        return res.send("Unauthorized")
    }
    try{
        const verification = jwt.verify(token,SECRET);
        if(verification){
            const Posts = await PostModel.find();
            return res.status(201).send(Posts)
        }
        return res.status(401).send("invalid token")
    }
    catch(err){
        blacklist.push(token)
        return res.status(400).send(err.message)
    }
})

//updatePost
PostRouter.post("/updatepost",async(req,res)=>{
    const{title,id}=req.body;
    const token = req.headers["authorization"];

    if(!token){
        return res.send("Unauthorized")
    }
    try{
        const verification = jwt.verify(token,SECRET);
        if(verification){
            //const userid = verification.id;
            await PostModel.findByIdAndUpdate({_id:id},{title:title});
            const Posts = await PostModel.find();
            return res.status(201).send(Posts)
        }
        return res.status(401).send("invalid token")
    }
    catch(err){
        if(err.message==="token expired"){
            blacklist.push(token)
        }
        return res.status(400).send(err.message)
    }
})

//delete post
PostRouter.delete("/deletepost/:id",async(req,res)=>{
    const{id}=req.params;
    try{
            await PostModel.findByIdAndDelete({_id:id});
            const Posts = await PostModel.find();
            return res.status(201).send(Posts)
    }
    catch(err){
        return res.status(400).send(err.message)
    }
})

module.exports=PostRouter