const express = require('express')
const router = express.Router()
const moment = require('moment')
const mongoose = require('mongoose')

const Transaction = mongoose.model('Transaction')


router.get('/', (req, res) => {
    Transaction.find().sort({'original.date': 'asc'}).exec((err, transactions) => {
        if (err) res.jsonp({err: err})
        else res.jsonp(transactions)
    })
})

router.get('/from/:startMonth/:startYear/to/:endMonth/:endYear/:category', (req, res) => {
    const startMoment = moment(req.params.startYear + '-' + req.params.startMonth, 'YYYY-MM')
    const endMoment = moment(req.params.endYear + '-' + req.params.endMonth, 'YYYY-MM')
    // get the last day of the given end month by adding a month and subtracting a day
    endMoment.add(1, 'M').subtract('1', 'd')

    const find = { date: { $gte: startMoment.format(), $lte: endMoment.format() } }

    Transaction
        .find(find)
        .sort({ date: -1 })
        .exec((err, transactions) => {
            // TODO if category supplied, filter transactions by transaction.items[n].category
            if (err) {
                console.log(err)
                return res.jsonp({ err: err })
            }
            if (transactions) {
                return res.jsonp(transactions)
            }
        })
})

router.put('/:id/simple-edit/', (req, res) => {
    let query = Transaction.where({_id: req.params.id})
    let update = {
        payee: req.body.payee,
        items: req.body.items
    }
    query.findOneAndUpdate(update, function (err, doc) {
        if (err) {
            console.log(err)
            return res.jsonp({ err: err })
        }
        if (doc) {
            return res.jsonp({ doc: doc })
        }
    })
})

router.get('/by-category/:category', (req, res) => {
    const category = req.params.category
    const find = { 'items.category': category }
    Transaction
        .find(find)
        .sort({ date: -1 })
        .exec((err, transactions) => {
            if (err) {
                console.log(err)
                return res.jsonp({ err: err })
            }
            if (transactions) {
                return res.jsonp(transactions)
            }
        })
})

module.exports = router
