const weatherCheck=async(req,res)=>{

    const response = await fetch(
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
        req.body.value +
        "?unitGroup=metric&key="+ process.env.weatherBee +"&contentType=json",
        { mode: "cors" }
    );
    const weatherJson = await response.json();
    res.json(weatherJson);

    
}

module.exports={weatherCheck};