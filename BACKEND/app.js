require("dotenv").config();

const dns = require("dns");
dns.setServers(["1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const router =require("./Route/UserRouters");
const app = express();
const cors =require("cors");

const PORT = process.env.PORT || 5005;

app.use(express.json());
app.use(cors());
app.use("/users",router);

require("./Model/Register");
const User= mongoose.model("Register");

app.post("/register", async (req, res) => {
        const { name, gmail, password } = req.body;
        try {
            await User.create({ name, gmail, password });
            res.sendStatus(200);
        } catch (err) {
            res.sendStatus(400);
        }
     }); 

     app.post("/login",async(req,res)=>{
        const {gmail,password}=req.body;
        try{
            const user= await User.findOne({gmail});
            if(!user){
                return res.json({err:"User not found"})
            }
            if(user.password===password){
                return res.send({status:"ok"});
            }else{
              return res.json({err:"incorrect password"});
        }
        }catch(err){
            console.error(err);
            res.status(500).json({err:"server Err"})
        }
     })
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err.message);
   
    });

    
       