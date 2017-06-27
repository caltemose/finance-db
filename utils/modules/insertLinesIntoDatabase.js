const Promise = require('bluebird')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

module.exports = function insertLinesIntoDatabase (lines) {
    console.log('insertDataIntoDatabase', lines.length)
    return new Promise((resolve, reject) => {
        // TODO pass mongo URL through arguments instead of hard-coding it
        MongoClient.connect('mongodb://localhost:27017/finances-db-v2', (err, db) => {
            if (err) {
                reject(err)
            }

            lines = lines.map(update)

            const collection = db.collection('transactions')
            collection.insertMany(lines, (err, res) => {
                db.close()

                if (err) {
                    reject(err)
                }

                resolve(lines.length + ' items inserted into dabase')
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
    if (doc.createdOn) {
        doc.createdOn = new Date(doc.createdOn)
    }
    if (doc.startDate) {
        doc.startDate = new Date(doc.startDate)
    }
    return doc
}

function update (doc) {
    doc = updateDocId(doc)
    doc = updateDates(doc)
    return doc
}
