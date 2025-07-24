const indexControl=async(req,res)=>{
    res.send(req.cookies.token);

}

module.exports={indexControl}