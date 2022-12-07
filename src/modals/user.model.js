const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String},
    username:{type:String}
})

const UserModel = new mongoose.model("user",UserSchema);
module.exports=UserModel;