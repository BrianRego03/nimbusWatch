const redisClient=require("../config/redisClient");

const logoutUser= async(req,res)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(400).json({ message: 'No token found in cookies' });
    }

    await redisClient.set(`bl:${token}`, '1', {EX: 86400});

    res.clearCookie('token');
    return res.json({message:'Logged out successfully'});
}

module.exports=logoutUser;