const mongoose = require('mongoose')
const express = require('express')

const config = require('../config')
const middleware = require('./middleware')
const models = require('./models');
const routes = require('./routes')

mongoose.set('debug', true)
mongoose.connect(config.mongoUrl(), function (err) {
    if (err) throw err

    const app = express()
    middleware(app)
    routes(app)

    app.listen(config.ports.api, function () {
        console.log('Express server on:', config.ports.api)
    })
})
