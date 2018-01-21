const args = require('args')
const path = require('path')
const loadJsonFile = require('load-json-file')
const checkFileExistence = require('./modules/checkFileExistence')
const insertArrayIntoDatabase = require('./modules/insertArrayIntoDatabase')
const handleError = require('./modules/handleError')

function parseArgs () {
    args
        .option('filein', 'JSON file of transactions to convert')
        .option('collection', 'MongoDB collection into which data will be inserted')
    const flags = args.parse(process.argv)

    let inputFile = flags.filein

    if (!inputFile)
        handleError('No input file provided.')

    let collection = flags.collection
    if (!collection)
        handleError('No collection name provided.')

    return { inputFile, collection }
}

let { inputFile, collection } = parseArgs()
inputFile = path.resolve(__dirname, inputFile)

const databaseUrl = 'mongodb://localhost:27017/finances-db-v2'

checkFileExistence(inputFile)
    .then(inputFile => {
        return loadJsonFile(inputFile).then(result => result ).catch(error => error )
    })
    .then(json => {
        return insertArrayIntoDatabase(databaseUrl, collection, json.docs)
    })
    .then(result => { console.log (result) })
    .catch(error => { throw new Error(error) })
