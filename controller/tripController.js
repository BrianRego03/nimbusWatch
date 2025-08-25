const {createTrip,dropTrip,fetchAllTrips,fetchSoloTrip,} =require("../db/query");

const tripSet=async(req,res)=>{

    
    let name =(req.body.name);
    let date =(req.body.date);


    const dbresponse = await createLaundry(name,date,req.user.id);

    res.json(dbresponse);


    
}


module.exports={tripSet};