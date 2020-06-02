const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=6209f10d9935bf4e5c2184b8328a161f&query='+latitude+','+longitude;

    request({ url , json:true },(error,{body})=>{
        if(error){
            callback("unable to connect to weather service","undefined");
        }else if(body.error){
            callback("unable to find location",undefined);
        }else{
            callback(undefined,
                body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degrees out. It feels like "+body.current.feelslike+" degrees out."
            )
        }
    })

}



module.exports = forecast ;