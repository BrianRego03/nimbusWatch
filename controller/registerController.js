const bcrypt=require("bcryptjs");
const {registerUser}=require("../db/query");

const registerControl= async(req,res,next)=>{
    try{
        const hashedPass= await bcrypt.hash(req.body.password,10);
        const dbStatus=await registerUser(req.body.username,hashedPass);
        if(dbStatus){
            res.status(201).json({message:"user registered"});
        }else{
            res.status(409).json({message:"user already registered"});
        }
        
    }catch(error){
        console.error(error);
        next(error);
    }
}

module.exports={registerControl};