const geocode  = require('./utils/geocode')
const forecast = require('./utils/forecast')

const hbs = require('hbs')
const path = require('path')
const express = require('express')
const app = express()

// Define path for express
const publicDirectoryName = path.join(__dirname,'../public')
const viewHandlerDirName = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Set up static directory to serve
app.use(express.static(publicDirectoryName))

// Set handlers engine and views locations
app.set('view engine','hbs') // default path of handler
app.set('views',viewHandlerDirName) // set path for handler
hbs.registerPartials(partialsPath)


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'vishalika'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me Page',
        name:'Vishalika'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'Help text',
        title:'Help Page',
        name:'Singh'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        }); 
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            });
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error
                });
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            });
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide search term'
        }); 
    }
    res.send({
        products:[]
    });
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Vishalika',
        errorMessage:'Help article not found.'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Vishalika',
        errorMessage:'Page not found.'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})