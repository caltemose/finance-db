const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Category = mongoose.model('Category')
const Transaction = mongoose.model('Transaction')

router.get('/', (req, res) => {
    Category.find().sort({category: 1}).exec((err, categories) => {
        if (err) res.status(503).jsonp({err:err})
        else res.jsonp(categories)
    })
})

router.post('/', (req, res) => {
    const data = {
        category: req.body.category,
        inBudget: req.body.inBudget
    }

    Category.create(data, (err, category) => {
        if (err) return res.status(400).jsonp({ err })
        else return res.jsonp(category)
    })
})

router.get('/extract', (req, res) => {
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

router.put('/:id/in-budget/:value', (req, res) => {
    const id = req.params.id
    const inBudget = req.params.value === 'true'

    Category.update({_id: id}, { $set: { inBudget: inBudget }}, (err) => {
        if (err) return res.status(400).jsonp({err: err})
        else return res.jsonp({id: id})
    })
})

module.exports = router
