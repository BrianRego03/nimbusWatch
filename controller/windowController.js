const { createWindow, fetchAllWindows, fetchWindow, dropWindow, fetchLaundry, fetchSoloTrip } = require("../db/query");

const windowSet=async(req,res)=>{
    let startObj={}
    let endObj={}
    
    startObj.Day =(req.body.swDay)|| undefined;;
    startObj.Hour =parseInt(req.body.swHour);
    startObj.Min =parseInt(req.body.swMin);
    endObj.Day =(req.body.edDay) || undefined;;
    endObj.Hour =parseInt(req.body.edHour);
    endObj.Min =parseInt(req.body.edMin);
    let dayIndex=req.body.swDay?dayToIndex(req.body.swDay):undefined;
    let windowType=req.body.wtype;
    let parentid = parseInt(req.body.parentid);

    const dbresponse = await createWindow(startObj,endObj,parentid,windowType,dayIndex,+(req.user.id));
    
    if(dbresponse.laundryId){
        const response = await fetchLaundry(dbresponse.laundryId);
        response.laundryId=response.id;
        return res.json(response);        
    }else if(dbresponse.tripId){
        const response = await fetchSoloTrip(dbresponse.tripId,+(req.user.id));
        response.tripId=response.id;
        return res.json(response);
    }
    
    res.json(dbresponse);


    
}

const windowCheck=async(req,res)=>{


    const dbresponse = await fetchAllWindows(req.body.wtype,req.body.parentid,+(req.user.id));
    res.json(dbresponse);


    
}

const soloWindow=async(req,res)=>{
    const dbresponse =await fetchWindow(+(req.params.id));
    res.json(dbresponse);
}

const deleteWindow =async(req,res)=>{
    const dbresponse = await dropWindow(+(req.params.id),+(req.user.id));
    if(dbresponse?.laundryId){
        const laundryObj=await fetchLaundry(+(dbresponse.laundryId),+(req.user.id));
        res.json(laundryObj);
    }else if(dbresponse?.tripId){
        const tripObj=await fetchSoloTrip(+(dbresponse.tripId),+(req.user.id));
        res.json(tripObj);        
    }else{
        return dbresponse;
    }
    
    
}


function dayToIndex(day) {
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

  const index = days.indexOf(day);
  return index === -1 ? null : index + 1;
}
module.exports={windowCheck,windowSet,soloWindow,deleteWindow};