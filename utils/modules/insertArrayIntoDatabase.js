const Promise = require('bluebird')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

module.exports = function insertArrayIntoDatabase (databaseUrl, collectionName, docs) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(databaseUrl, (err, db) => {
            if (err) {
                reject(err)
            }

            docs = docs.map(updateDocId)

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
