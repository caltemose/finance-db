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

            lines = lines.map(updateDocId)

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