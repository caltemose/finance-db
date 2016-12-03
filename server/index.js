const mongoose = require('mongoose')
const express = require('express')
// const cors = require('express-cors')

const middleware = require('./middleware')
const models = require('./models');
const routes = require('./routes')

const config = {
    port: 3333,
    mongoUrl: 'mongodb://localhost/finances-db'
}

mongoose.set('debug', true)
mongoose.connect(config.mongoUrl, function (err) {
    if (err) throw err

    const app = express()
    middleware(app)
    routes(app)

    app.listen(config.port, function () {
        console.log('Express server on:', config.port)
    })
})
