const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
//port = to environment variable value, running on heroku
const port = process.env.PORT || 3000

//defining paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setting up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setting up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jherica Tiu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jherica Tiu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Jherica Tiu'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
              return console.log(error);
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
      
    })
})

app.get('/products', (req, res) => {
    //query contains all query string information
    //this code will run if there is no search term
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Jherica Tiu',
    errorMessage: 'Help article not found'
  })
})

//* - wildcard character, meaning match anything that hasnt been matched so far
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Jherica Tiu',
    errorMessage: 'Page not found'
  })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})