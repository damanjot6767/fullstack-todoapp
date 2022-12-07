const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userid:{type:String,required:true},
    title:{type:String,required:true}
})

const PostModel = new mongoose.model("post",PostSchema);
module.exports=PostModel;