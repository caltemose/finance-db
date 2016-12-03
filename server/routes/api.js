const fs = require('fs')
const path = require('path')
const linereader = require('line-reader')
const mongoose = require('mongoose')
const Transaction = mongoose.model('Transaction')

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

    // app.post('/api/import', (req, res) => {
    //     // test to see if file exists
    //     let filein = path.normalize(__dirname + '/../../financial-data/csv/' + req.body.file)
    //
    //     if (!req.body.account) {
    //         return res.jsonp({err: 'You must specify an account'})
    //     }
    //
    //     fs.stat(filein, function (err, stat) {
    //         if (err) {
    //             res.jsonp({err: `The file ${filein} does not exist.`})
    //         }
    //
    //         function getObjFromLine (line) {
    //             var split = line.split(',')
    //             if (split.length < 6) return
    //             var obj = {}
    //             obj.date = new Date(split[2])
    //             obj.description = split[4]
    //             obj.category = split[5]
    //             var amt = split[6]
    //             // positive values start with '--', strip it
    //             amt = amt.replace('--', '')
    //             obj.amount = parseFloat(amt)
    //             return obj
    //         }
    //
    //         let lines = []
    //
    //         linereader.eachLine(filein, (line, last) => {
    //             let lineObj = getObjFromLine(line);
    //             if (lineObj) {
    //                 lines.push(lineObj)
    //             }
    //             if (last) {
    //                 writeToDb()
    //             }
    //         })
    //
    //         function writeToDb () {
    //             let response = res
    //             let account = req.body.account
    //             let errors = []
    //             let created = []
    //             for(let i=0; i<lines.length; i++) {
    //                 let line = lines[i]
    //                 let model = cleanTransactionLine(line, account)
    //                 Transaction.create(model, function (err, item) {
    //                     if (err) {
    //                         console.log('err', err)
    //                         errors.push(err)
    //                     } else if (!item) {
    //                         console.log('!item')
    //                         errors.push('no item created')
    //                     } else {
    //                         console.log('created!', i)
    //                         created.push(model)
    //                     }
    //                     // last item handled
    //                     if (i === lines.length-1) {
    //                         console.log('lengths', errors.length, created.length)
    //                         let res = {}
    //                         if (errors.length) res.errors = errors
    //                         if (created.length) res.created = created
    //                         response.jsonp({ errors: errors, created: created })
    //                     }
    //                 })
    //             }
    //         }
    //
    //         function cleanTransactionLine (line, account) {
    //             let cleaned = {}
    //             cleaned.original = line
    //             cleaned.amount = line.amount
    //             cleaned.date = line.date
    //             cleaned.account = account
    //             // TODO handle conversion of description and category
    //             // convert description to payee
    //             cleaned.payee = cleaned.original.description
    //             // convert category
    //             cleaned.category = cleaned.original.category
    //             return cleaned
    //         }
    //
    //     })
    // })

}
