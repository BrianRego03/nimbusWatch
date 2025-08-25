const { createLocation, 
    dropLocation, 
    updateLocationWeather,
    bulkUpdateLocationWeather, 
    fetchAllLocationID } = require("../db/query");


const locationSet=async(req,res)=>{
    const name = (req.body.place) + " " + (req.body.city);
    const nameVerify = await locationCheck(name);
    if(nameVerify?.error){
        return res.json({message:"Invalid location"});
    }
    const ltype = req.body.ltype;
    const parentid =+(req.body.parentid);
    const userid= +(req.user.id);
    const location = await createLocation(nameVerify.name,ltype,parentid,userid);
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
    return {name: weatherJson.resolvedAddress};

}

const locationDelete=async(req,res)=>{
    const location = await dropLocation(+(req.params.id),+(req.user.id));
    res.json(location);

}

module.exports={locationCheck,locationSet,locationDelete};

