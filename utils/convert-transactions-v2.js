const args = require('args')
const path = require('path')
const checkFileExistence = require('./modules/checkFileExistence')
const convertToV2 = require('./modules/convertToV2')
const insertLinesIntoDatabase = require('./modules/insertLinesIntoDatabase')
const handleError = require('./modules/handleError')

function parseArgs () {
    args.option('filein', 'JSON file of transactions to convert')
    const flags = args.parse(process.argv)

    let inputFile = flags.filein

    if (!inputFile)
        handleError('No input file provided.')

    return inputFile
}

const inputFile = path.resolve(__dirname, parseArgs())

checkFileExistence(inputFile)
    .then(convertToV2)
    .then(insertLinesIntoDatabase)
    .catch(error => { throw new Error(error) })
