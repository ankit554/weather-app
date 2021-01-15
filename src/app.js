const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');


const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather Forecast',
        name :'Ankit'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Page',
        name :'Ankit'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help Page',
        name :'Ankit'
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : "Please provide address for weather forecast"
        })
    }

    const address = req.query.address;
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(address, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                location: location,
                latitude,
                longitude,
                forecast: forecastData
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error : 'You must provide a search item'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Ankit',
        emsg : 'Help article not found.'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Ankit',
        emsg : 'Page not found!'
    });
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});