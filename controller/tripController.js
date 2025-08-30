const {createTrip,dropTrip,fetchAllTrips,fetchSoloTrip, 
    fetchSoloTripComplete,updateTripDetails} =require("../db/query");

const tripSet=async(req,res)=>{

    
    let name =(req.body.name);
    let date =(req.body.date);


    const dbresponse = await createTrip(name,date,req.user.id);

    res.json(dbresponse);


    
}

const deleteTrip=async(req,res)=>{
    const user=await dropTrip(+(req.params.id),+(req.user.id));
    
    const dbresponse = await fetchAllTrips(+user.userId);

    res.json(dbresponse);
}

const updateTrip=async(req,res)=>{
    let name =(req.body.name);
    let date =(req.body.date);
    let tripID = +(req.params.id);

    const dbresponse = await updateTripDetails(name,date,tripID,req.user.id);
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

    dbresponse.date=dbresponse.date.toISOString().split("T")[0];
    const startHour=dbresponse.window.startWindowHour;
    const endHour=dbresponse.window.endWindowHour;

    const dayArray= dbresponse.location.map((item)=>({
        ...item,
        weatherData:JSON.parse(item.weatherData)
        .filter((item,index)=>{
            return item.datetime===dbresponse.date
        })
        .map((innerItem,innerIndex)=>{
            
            innerItem.hours = innerItem.hours.filter((hourItem, hourIndex) => {
              
              let hourCurrent = +hourItem.datetime.split(":")[0];
              return hourCurrent >= startHour && hourCurrent <= endHour;
            });
            innerItem.rain=Boolean(innerItem.hours.find(h => {
                return ((h.precipprob > 40)&&(h.precip>=0.5));
            }));
            return innerItem;
        })
    }))

    

    dbresponse.location=dayArray;

    res.json(dbresponse)
}



module.exports={tripSet,deleteTrip,showAllTrips,showTrip,showTripReport,updateTrip};