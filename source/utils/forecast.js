const request = require ('request')
const forecast = (latitude,longitude,callback) => {
       const url  = 'http://api.weatherstack.com/current?access_key=4c32eb6b54971af2dc9849b306e5247d&query=' + latitude + ','  + longitude
       request({url,json:true},(error,{body})=>{
                if(error){
                       callback('Unable to connect to web service',undefined)
                      }
                else if (body.error){
                       callback('Unable to find location',undefined)
                       }
                else   {
                       callback(undefined ,
                            'Date and Time :' + body.location.localtime + " \nThe Temperature is " + body.current.temperature + '. climate is ' + body.current.weather_descriptions
                           )
                       }
       })
}
 module.exports = forecast