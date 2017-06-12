const Promise = require('bluebird')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

module.exports = function insertArrayIntoDatabase (databaseUrl, collectionName, docs) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(databaseUrl, (err, db) => {
            if (err) {
                reject(err)
            }

            docs = docs.map(update)

            const collection = db.collection(collectionName)
            collection.insertMany(docs, (err, res) => {
                db.close()

                if (err) {
                    reject(err)
                }

                resolve(docs.length + ' items inserted into database')
            })
        })
    })
}

function updateDocId (doc) {
    doc._id = new ObjectId(doc._id)
    return doc
}

function updateDates (doc) {
    if (doc.date) {
        doc.date = new Date(doc.date)
    }
    if (doc.original && doc.original.date) {
        doc.original.date = new Date(doc.date)
    }
    return doc
}

function update (doc) {
    doc = updateDocId(doc)
    doc = updateDates(doc)
    return doc
}