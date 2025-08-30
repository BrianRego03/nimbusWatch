const { createLaundrySchedule } = require("../db/query");


const scheduleSet=async(req,res)=>{

    
    let lid =+(req.body.lid);
    let wid =+(req.body.wid);
    let date =(req.body.date);


    const dbresponse = await createLaundrySchedule(date,lid,wid,+(req.user.id));
    res.json(dbresponse);


    
}

module.exports={scheduleSet};