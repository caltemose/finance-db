'use strict'

const CollectionExporter = require('./CollectionExporter')

const dbUrl = 'mongodb://localhost:27017/finances-db'
const collectionName = 'categories'
const savePath = '../backups/categories/'

const docModifier = (doc) => {
    doc.frequency = 1
    return doc
}

const callback = (err, fileout) => {
    if (err) {
        console.log('CollectionExporter error')
        console.log(err.toString())
        return
    }

    console.log(collectionName + ' written to file: ' + fileout)
    return
}

new CollectionExporter(dbUrl, collectionName, savePath, docModifier, callback)
