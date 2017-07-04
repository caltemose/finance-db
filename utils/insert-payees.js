'use strict'

const MongoClient = require('mongodb').MongoClient
const fs = require('fs')

const dbUrl = 'mongodb://localhost:27017/finances-db-v2'

const file = JSON.parse(fs.readFileSync('../backups/payees.json', 'utf-8'))

const payees = file.payees.map(payee => {
    return { payee: payee }
})

MongoClient.connect(dbUrl, (err, db) => {
    const collection = db.collection('payees')
    collection.insert(payees)
    db.close()
})

