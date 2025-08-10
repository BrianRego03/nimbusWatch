const { createWindow, fetchAllWindows, fetchWindow, dropWindow } = require("../db/query");

const windowSet=async(req,res)=>{
    let startObj={}
    let endObj={}
    
    startObj.Day =(req.body.swDay);
    startObj.Hour =parseInt(req.body.swHour);
    startObj.Min =parseInt(req.body.swMin);
    endObj.Day =req.body.edDay;
    endObj.Hour =parseInt(req.body.edHour);
    endObj.Min =parseInt(req.body.edMin);

    const dbresponse = await createWindow(startObj,endObj,req.user.id);

    res.json(dbresponse);


    
}

const windowCheck=async(req,res)=>{


    const dbresponse = await fetchAllWindows(req.user.id);
    res.json(dbresponse);


    
}

const soloWindow=async(req,res)=>{
    const dbresponse =await fetchWindow(+(req.params.id));
    res.json(dbresponse);
}

const deleteWindow =async(req,res)=>{
    const dbresponse = await dropWindow(+(req.params.id))
    res.json({success:dbresponse});
}

module.exports={windowCheck,windowSet,soloWindow,deleteWindow};