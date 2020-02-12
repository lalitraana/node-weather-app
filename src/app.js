const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000


//Define  path for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location  
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//This will set up our static file at home route
app.use(express.static(publicDirectoryPath))

console.log('hello')
// app.get('/',(req, res)=>{
//     res.send('Hello express!') this is not in use anymore because above code will throw files on home route 

// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Lalit'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Lalit'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Some helpful Text',
        title: 'Help',
        name: 'Lalit'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {

        return res.send({
            error: "You must provide an address"
        })
    }
    // most important point we have given default empty object if location is not found the server will not
    geocode(req.query.address, (error, { lattitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(lattitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            })

        })
    })



    // res.send({
    //     forecast: 'sunny',
    //     location: 'delhi',
    //     address: req.query.address
    // })

})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'

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
        name: 'Lalit',
        errorMessage: 'Help article not found.'
    })
})

app.get("*", (req, res) => {

    res.render('404', {
        title: '404',
        name: 'Lalit',
        errorMessage: "Page not found."
    })
})

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})

