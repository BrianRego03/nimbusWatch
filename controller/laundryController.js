const { createLaundry, fetchAllLaundry, fetchLaundry, dropLaundry, updateLaundry } = require("../db/query");

const laundrySet=async(req,res)=>{

    
    let name =(req.body.name);
    let location =(req.body.place) + " " + (req.body.city);


    const dbresponse = await createLaundry(name,location,req.user.id);
    const response =await fetchAllLaundry(+(req.user.id));
    res.json(response);


    
}

const laundryPatch=async(req,res)=>{

    
    let name =(req.body.name);
    let location =(req.body.place) + " " + (req.body.city);


    const dbresponse = await updateLaundry(name,location,+(req.params.id),req.user.id);
    res.json(dbresponse);


    
}

const laundryCheck=async(req,res)=>{


    const dbresponse = await fetchAllLaundry(req.user.id);
    res.json(dbresponse);


    
}

const soloLaundry=async(req,res)=>{
    const dbresponse =await fetchLaundry(+(req.params.id),+(req.user.id));

    if(dbresponse?.userId!==(+req.user.id)){
        return res.json({error:"Unauthorized resource requested!"});
    }
    if(!dbresponse){
        return res.json({error:"Invalid request"});
    }
    res.json(dbresponse);
}

const deleteLaundry =async(req,res)=>{
    const userid = await dropLaundry(+(req.params.id),+(req.user.id));
    const dbresponse =await fetchAllLaundry(+userid);

    res.json(dbresponse);
}

module.exports={laundryCheck,laundrySet,soloLaundry,deleteLaundry,laundryPatch};