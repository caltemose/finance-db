const MongoClient = require('mongodb').MongoClient
const fs = require('fs')

const dbUrl = 'mongodb://localhost:27017/finances-db-v2'

MongoClient.connect(dbUrl, (err, db) => {
    const collection = db.collection('payees')
    collection.find().toArray((err, payees) => {
        if (err) {
            db.close()
            throw err
        }

        const transactionCollection = db.collection('transactions')
        transactionCollection.find().toArray((err, transactions) => {
            transactions.forEach(transaction => {
                let payeeId = getPayeeIdByName(transaction.payee, payees)
                if (payeeId) {
                    transactionCollection.update(
                        { _id: transaction._id},
                        { $set: { payeeId:  payeeId}}
                    )
                }
            })
            db.close()
        })
    })
})

function getPayeeIdByName (name, payees) {
    for(let i=0; i<payees.length; i++) {
        if (payees[i].payee === name) return payees[i]._id
    }
    return null
}
