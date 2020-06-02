const request = require('request')

const geocode = (address,callback)=>{
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidmlzaGFsaWthIiwiYSI6ImNrYW1xa2x4dDEzOXkycm82dnQ4d2o2b3EifQ.oMdwST8f86dpDr1nkkQU9w&limit=1';

    request({ url : geocodeUrl , json:true },(error,response)=>{
        if(error){
            callback("unable to connect to location service","undefined");
        }else if(response.body.features.length===0){
            callback("unable to find location",undefined);
        }else{
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].context[0].text,
            })
        }
    })

}



module.exports = geocode ;