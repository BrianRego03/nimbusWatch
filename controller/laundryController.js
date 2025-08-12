const { createLaundry, fetchAllLaundry, fetchLaundry, dropLaundry } = require("../db/query");

const laundrySet=async(req,res)=>{

    
    let name =(req.body.name);
    let location =(req.body.place) + " " + (req.body.city);


    const dbresponse = await createLaundry(name,location,req.user.id);

    res.json(dbresponse);


    
}

const laundryCheck=async(req,res)=>{


    const dbresponse = await fetchAllLaundry(req.user.id);
    res.json(dbresponse);


    
}

const soloLaundry=async(req,res)=>{
    const dbresponse =await fetchLaundry(+(req.params.id));
    res.json(dbresponse);
}

const deleteLaundry =async(req,res)=>{
    const dbresponse = await dropLaundry(+(req.params.id))
    res.json({success:dbresponse});
}

module.exports={laundryCheck,laundrySet,soloLaundry,deleteLaundry};