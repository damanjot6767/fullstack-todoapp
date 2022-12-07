const mongoose =require("mongoose");
require("dotenv").config();

const MONGO_URL=process.env.MONGO_URL
const connect = async()=>{
    return mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
}

module.exports=connect;