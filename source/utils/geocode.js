const request = require('request')

const geocode = (address,callback) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + decodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2Fpc2FtZWVyMTIzIiwiYSI6ImNrcDRkb2t5aTBkZG4yd2xyNHUwa2lyYWgifQ.9AeMTP_QZJIvs73e9dMo3A&limit=1'
        request({url,json:true},(error,{body})=>{
                if(error){
                       callback('Unable to connect to web service',undefined)
                      }
                else if (body.features.length === 0){
                       callback('Unable to find location',undefined)
                       }
                else   {
                       callback(undefined , {
                                latitude : body.features[0].center[1],
                                longitude: body.features[0].center[0],
                                location : body.features[0].place_name
                       })
                }
         })
}

module.exports = geocode