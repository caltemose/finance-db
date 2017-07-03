'use strict'

const CollectionExporter = require('./modules/CollectionExporter')

const dbUrl = 'mongodb://localhost:27017/finances-db'
const collectionName = 'transactions'
const savePath = '../backups/transactions/'

const callback = (err, fileout) => {
    if (err) {
        console.log('CollectionExporter error')
        console.log(err.toString())
        return
    }

    console.log(collectionName + ' written to file: ' + fileout)
    return
}

new CollectionExporter(dbUrl, collectionName, savePath, null, callback)
