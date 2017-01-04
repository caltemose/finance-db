const fs = require('fs')
const path = require('path')
const linereader = require('line-reader')
const mongoose = require('mongoose')
const moment = require('moment')

const Transaction = mongoose.model('Transaction')
const Category = mongoose.model('Category')
const Budget = mongoose.model('Budget')

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

    app.get('/api/transactions/from/:startMonth/:startYear/to/:endMonth/:endYear', (req, res) => {
        // const startDate = new Date(req.params.startYear + '/' + req.params.startMonth).toISOString()
        // const endDate = new Date(req.params.endYear + '/' + req.params.endMonth).toISOString()
        const startMoment = moment(req.params.startYear + '-' + req.params.startMonth, 'YYYY-MM')
        const endMoment = moment(req.params.endYear + '-' + req.params.endMonth, 'YYYY-MM')
        // get the last day of the given end month by adding a month and subtracting a day
        endMoment.add(1, 'M').subtract('1', 'd')

        Transaction
            .find({ date: { $gte: startMoment.format(), $lte: endMoment.format() }})
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

    app.put('/api/transaction/:id/simple-edit/', (req, res) => {
        let query = Transaction.where({_id: req.params.id})
        let update = {
            category: req.body.category,
            payee: req.body.payee
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
            else return res.jsonp({id: id})
        })
    })

    app.get('/api/budgets', (req, res) => {
        Budget.find().sort({startDate: -1}).exec((err, budgets) => {
            if (err) res.status(503).jsonp({err: err})
            else res.jsonp(budgets)
        })
    })

    app.post('/api/budgets/', (req, res) => {
        const startDate = req.body.startDate
        const createdOn = req.body.createdOn
        const categories = req.body.categories

        const data = {
            createdOn: createdOn,
            startDate: startDate,
            categories: categories
        }

        Budget.create(data, (err, budget) => {
            if (err) return res.status(400).jsonp({err: err})
            else return res.jsonp(budget)
        })

    })

    app.get('/api/budgets/current', (req, res) => {
        // sort the budgets by startDate in reverse chronological order
        Budget.find().sort({startDate:-1}).exec((err, budgets) => {
            let budget
            // find the first budget with a startDate that isn't in the future.
            // since the budgets are sorted reverse chrono, we are guaranteed
            // that the first budget found in this loop is the current budget
            for(let i=0; i<budgets.length; i++) {
                if ( moment(budgets[i].startDate).isSameOrBefore(moment()) ) {
                    budget = budgets[i]
                    break
                }
            }
            return res.jsonp(budget)
        })
    })

    app.get('/api/budgets/from/:startMonth/:startYear', (req, res) => {
        const startDate = new Date(req.params.startYear + '/' + req.params.startMonth).toISOString()
        Budget.find({ startDate: { $lte: startDate }}).sort({ startDate: -1 }).limit(1).exec((err, budgets) => {
            if (err) return res.status(400).jsonp({err: err})

            if (!budgets || budgets.length === 0) {
                return res.jsonp({err: "No budgets found in the given range"})
            }

            if (budgets.length) {
                return res.jsonp(budgets[0])
            }
        })
    })
}
