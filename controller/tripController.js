const {createTrip,dropTrip,fetchAllTrips,fetchSoloTrip, fetchSoloTripComplete,} =require("../db/query");

const tripSet=async(req,res)=>{

    
    let name =(req.body.name);
    let date =(req.body.date);


    const dbresponse = await createTrip(name,date,req.user.id);

    res.json(dbresponse);


    
}

const deleteTrip=async(req,res)=>{
    const dbresponse=await dropTrip(+(req.params.id),+(req.user.id));

    res.json(dbresponse);
}

const showAllTrips=async(req,res)=>{
    const dbresponse=await fetchAllTrips(+(req.user.id));

    res.json(dbresponse)
}

const showTrip=async(req,res)=>{
    const dbresponse=await fetchSoloTrip(+(req.params.id),+(req.user.id));

    res.json(dbresponse)
}

const showTripReport=async(req,res)=>{
    const dbresponse=await fetchSoloTripComplete(+(req.params.id),+(req.user.id));

    res.json(dbresponse)
}



module.exports={tripSet,deleteTrip,showAllTrips,showTrip,showTripReport};