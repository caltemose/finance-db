const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const moment = require('moment')

const Budget = mongoose.model('Budget')

router.get('/', (req, res) => {
    Budget.find().sort({startDate: -1}).exec((err, budgets) => {
        if (err) res.status(503).jsonp({err: err})
        else res.jsonp(budgets)
    })
})

router.post('/', (req, res) => {
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

router.get('/current', (req, res) => {
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

router.get('/from/:startMonth/:startYear', (req, res) => {
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

router.put('/:id', (req, res) => {
    const id = req.params.id
    const startDate = req.body.startDate
    const categories = req.body.categories

    Budget.update({_id: id}, { $set: { startDate: startDate, categories: categories }}, (err) => {
        if (err) return res.status(400).jsonp({err: err})
        else return res.jsonp({id: id})
    })
})


module.exports = router
