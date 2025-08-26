const { createLocation, 
    dropLocation, 
    updateLocationWeather,
    bulkUpdateLocationWeather, 
    fetchAllLocationID, 
    fetchSoloTrip} = require("../db/query");


const locationSet=async(req,res)=>{
    const name = (req.body.place) + " " + (req.body.city);
    const nameVerify = await locationCheck(name);
    if(nameVerify?.error){
        return res.json({message:"Invalid location"});
    }
    const ltype = req.body.ltype;
    const parentid =+(req.body.parentid);
    const userid= +(req.user.id);
    const weatherData=JSON.stringify(nameVerify.days.slice(0,7));
    const location = await createLocation(nameVerify.resolvedAddress,ltype,parentid,weatherData,userid);
    if(location.tripId){
        const response = await fetchSoloTrip(location.tripId,userid);
        return res.json(response);
    }
    res.json(location);
}

const locationCheck=async(nameString)=>{

    const weatherData = await fetch(
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
        encodeURIComponent(nameString) +
        "?unitGroup=metric&key=" + process.env.weatherBee + "&contentType=json",
        { mode: "cors" }
    );

    if(!weatherData.ok){
        return {error:true}
    }

    const weatherJson = await weatherData.json();
    return weatherJson;

}

const locationDelete=async(req,res)=>{
    const location = await dropLocation(+(req.params.id),+(req.user.id));
    if(location.tripId){
        const response = await fetchSoloTrip(location.tripId,userid);
        return res.json(response);
    }
    res.json(location);

}

module.exports={locationCheck,locationSet,locationDelete};

