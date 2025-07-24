const stateCheck=async(req,res)=>{
    res.json({
        loggedIn:true,
        user:{
            id:req.user.id,
            username:req.user.username,
            role:req.user.role
        }
    })
}

module.exports={stateCheck};