const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const moment = require('moment')

const Payee = mongoose.model('Payee')

router.get('/', (req, res) => {
    Payee.find().sort({payee: 1}).exec((err, payees) => {
        if (err) res.status(503).jsonp({err: err})
        else res.jsonp(payees)
    })
})

module.exports = router
