const { createWindow, fetchAllWindows, fetchWindow, dropWindow, fetchLaundry } = require("../db/query");

const windowSet=async(req,res)=>{
    let startObj={}
    let endObj={}
    
    startObj.Day =(req.body.swDay);
    startObj.Hour =parseInt(req.body.swHour);
    startObj.Min =parseInt(req.body.swMin);
    endObj.Day =req.body.edDay;
    endObj.Hour =parseInt(req.body.edHour);
    endObj.Min =parseInt(req.body.edMin);
    let dayIndex=dayToIndex(req.body.swDay)
    let windowType=req.body.wtype;
    let parentid = parseInt(req.body.parentid);

    const dbresponse = await createWindow(startObj,endObj,parentid,windowType,dayIndex,+(req.user.id));

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
    const laundryObj=await fetchLaundry(+(dbresponse.laundryId));
    res.json(laundryObj);
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