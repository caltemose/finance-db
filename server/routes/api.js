const fs = require('fs')
const path = require('path')
const linereader = require('line-reader')
const mongoose = require('mongoose')
const Transaction = mongoose.model('Transaction')
const Category = mongoose.model('Category')

module.exports = function (app) {

    app.get('/api/', (req, res) => {
        res.render('api/index.pug')
    })

    app.get('/api/transactions', (req, res) => {
        Transaction.find().sort({'original.date': 'asc'}).exec((err, transactions) => {
            if (err) res.jsonp({err: err})
            else res.jsonp(transactions)
        })
    })

    app.put('/api/transaction/:id/simple-edit/', (req, res) => {
        let query = Transaction.where({_id: req.params.id})
        let update = {
            category: req.body.category,
            payee: req.body.payee
        }
        query.findOneAndUpdate(update, function (err, doc) {
            if (err) {
                console.log(err)
                return res.jsonp({err:err})
            }
            if (doc) {
                console.log(doc)
                return res.jsonp({doc:doc})
            }
        })
    })

    app.get('/api/categories/extract', (req, res) => {
        Transaction.find({}, 'category', (err, transactions) => {
            let categories = []
            transactions.forEach((transaction) => {
                if (!categories.includes(transaction.category)) {
                    categories.push(transaction.category)
                }
            })
            categories = categories.sort()
            return res.jsonp(categories)
        })
    })

    app.get('/api/categories', (req, res) => {
        Category.find().exec((err, categories) => {
            // TODO categories error should return proper http status code
            if (err) res.jsonp({err:err})
            else res.jsonp(categories)
        })
    })

    app.put('/api/categories/:id/in-budget/:value', (req, res) => {
        const id = req.params.id
        const inBudget = req.params.value === 'true'

        Category.update({_id: id}, { $set: { inBudget: inBudget }}, (err) => {
            if (err) return res.status(400).jsonp({err: err})
            else return res.sendStatus(200)
        })
    })

}
