const jwt=require("jsonwebtoken");
const redisClient=require("../config/redisClient");
const { findUserByID } = require("../db/query");



const authMiddleware=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.json({message:'unauthorized:no token'});
        }
        const isBlacklisted = await redisClient.get(`bl:${token}`);
        if(isBlacklisted){
            return res.json({message:'Token is blacklisted'});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const userId=decoded.id;

        let user =await redisClient.get(`user:${userId}`);
        if(user){
            req.user=JSON.parse(user);
            return next();
        }

        user=await findUserByID(userId);
        if(!user){
            return res.json({message:"User not found"});
        }
        await redisClient.set(`user:${userId}`,JSON.stringify(user),{EX:86400});
        req.user=user;
        next();
    }catch(err){
        return res.json({message:"Invalid token"});
    }
};

module.exports=authMiddleware;