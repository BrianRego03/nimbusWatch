const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const redisClient=require('../config/redisClient');
const {findUser}=require("../db/query");

const loginUser=async(req,res)=>{
    const {username,password}=req.body;
    const user=findUser(username);
    
    if(!user || !(bcrypt.compareSync(password, user.password))){
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token= jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'24h'});

    await redisClient.set(`user:${user.id}`,JSON.stringify(user),{EX: 86400});

    res.json({token});
}

module.exports={loginUser}