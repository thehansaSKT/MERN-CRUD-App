const User = require("../Model/UserModel");

const getAllUsers = async (requestAnimationFrame,res,next)=>{

    let Users;

    try{
        users = await user.find();
    }catch(err){
        console.log(err);
    }
     
    if(!users){
        return res.staus(404).json({message:"User Not Found"})
    }

    return res.status(200).json({users});

};
exports.getAllUsers=getAllUsers;