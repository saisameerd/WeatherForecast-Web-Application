const express = require('express')
const hbs = require('hbs')
const path = require('path')
const geocode= require('./utils/geocode')
const forecast =require('./utils/forecast')

const app = express()
 const port = process.env.PORT || 3000
// Define paths for Express config
const pathOfPublic = path.join(__dirname,'../public')
const pathOfView =path.join(__dirname,'../templates/views')
const pathOfPartial =path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',pathOfView)
hbs.registerPartials(pathOfPartial)

// Setup static directory to serve
app.use(express.static(pathOfPublic))


app.get('',(req,res)=>{
        res.render('index',{
                title:'Weather',
                name : 'sai sameer'
        })
})
app.get('/about',(req,res)=>{
        res.render('about',{
                title:'About',
                name: 'sai sameer'
        })
})
app.get('/help',(req,res)=>{
        res.render('help',{
                title:'Help',
                name: 'sai sameer'
        })
})
app.get('/weather',(req,res)=>{
        if(!req.query.address)
        {
          return res.send({
                 error: 'You must provide address'
         })
        }
           geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
             if(error){
                return res.send({error})
             }
               forecast(latitude,longitude,(error,forecastData)=>{
                  if(error)   {
                        return res.send({error})
                  }
                   res.send({
                        location,
                        forecast:forecastData ,
                        address:req.query.address
                    })
            })
     })
        
})
app.get('*',(req,res)=>{
        res.render('404',{
                title:'404 page not found',
                name: 'sai sameer',
                errorMessage : 'page not found'
        })
})
app.listen(port, () => {
        console.log('server is up on port '+ port)
})