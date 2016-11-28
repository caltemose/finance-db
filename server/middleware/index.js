const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

module.exports = function (app) {
    // serve static files from 'public' directory
    app.use(express.static( path.join(__dirname, '../public')))
    
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    // setup View handling
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'pug');
    // use Stlyus for CSS
    app.use(require('stylus').middleware(path.join(__dirname, '../public')));
}
