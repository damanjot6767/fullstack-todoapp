const express=require("express")
const connect = require("./db/connection");
const AuthRouter = require("./Routes/Auth.Routes");
const PostRouter = require("./Routes/Post.Routes");
require("dotenv").config();
const cors = require("cors");

const app=express();
const PORT = process.env.PORT||8002;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Auth Routes
app.use("/auth",AuthRouter)

//Post Routes
app.use("/post",PostRouter)


// app.post("/refresh",async(req,res)=>{
//     const Refreshtoken = req.headers["authorization"];
//     if(!Refreshtoken){
//         return res.status(401).send("unauthorized")
//     }
//     try{
//         const verification = jwt.verify(Refreshtoken,"REFRESH123456");
//         if(verification){
//             const newToken = jwt.sign({...verification},"SECRET123456", {expiresIn:"7 days"});
//             return res.send({message:"new tpken generated",token:newToken,Refreshtoken:Refreshtoken})
//         }
//         res.send("invalid tokren")
//     }
//     catch(err){
//         blacklist.push(Refreshtoken)
//         res.send("both token has expired login again")
//     }
// })

app.listen(PORT,async()=>{
     await connect().then(()=>console.log("connection successful")).catch(()=>console.log("connection unsuccessful"))
    console.log("working")
})