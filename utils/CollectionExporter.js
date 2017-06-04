'use strict'

const MongoClient = require('mongodb').MongoClient
const fs = require('fs')
const path = require('path')
const moment = require('moment')

class CollectionExporter {
    constructor (dbUrl, collectionName, savePath, docModifier, callback) {
        MongoClient.connect(dbUrl, (err, db) => {
            const collection = db.collection(collectionName)
            let docs = []
            collection.find().toArray((err, allDocs) => {
                if (err) {
                    throw err
                }
                allDocs.forEach((doc, indx) => {
                    if (docModifier) {
                        doc = docModifier(doc)
                    }
                    docs.push(doc)
                    if(indx === allDocs.length -1) {
                        db.close()
                        this.writeToFile(docs, collectionName, savePath, callback)
                    }
                })
            })
        })
    }

    writeToFile(docs, collectionName, savePath, callback) {
        let fileout = savePath + collectionName + '-' + moment().format('YYYYMMDD-HHmmss') + '.json'
        fileout = path.resolve(__dirname, fileout)
        const data = { docs: docs }
        fs.writeFile(fileout, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.log(err)
                throw err
            }
            callback(null, fileout)
        })
    }
}

module.exports = CollectionExporter