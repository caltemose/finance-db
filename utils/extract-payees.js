'use strict'

const MongoClient = require('mongodb').MongoClient
const fs = require('fs')

const dbUrl = 'mongodb://localhost:27017/finances-db-v2'

let payees = []

MongoClient.connect(dbUrl, (err, db) => {
    const collection = db.collection('transactions')
    collection.find().toArray((err, docs) => {
        if (err) {
            db.close()
            throw err
        }

        docs.forEach(doc => {
            addToPayees(doc.payee)
        })
        db.close()
        payees.sort()

        const data = {
            payees: payees
        }

        fs.writeFile('../backups/payees.json', JSON.stringify(data, null, 2), (err) => {
            console.log('done')
        })

    })
})

function addToPayees (payee) {
    if (!payees.includes(payee)) {
        payees.push(payee)
    }
}
