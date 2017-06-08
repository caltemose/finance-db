const args = require('args')
const path = require('path')
const Promise = require('bluebird')

const getArg = require('./modules/getArg')
const isValidAccount = require('./modules/isValidAccount')
const checkFileExistence = require('./modules/checkFileExistence')
const parseBankFile = require('./modules/parseBankFile')
const insertLinesIntoDatabase = require('./modules/insertLinesIntoDatabase')
const handleError = require('./modules/handleError')

function checkInputValidity () {
    args
        .option('filein', 'The CSV file to parse for bank data')
        .option('account', 'The bank account this data will be associated with')
    const flags = args.parse(process.argv)

    let inputFile = flags.filein
    let account = flags.account

    return new Promise((resolve, reject) => {
        if (!inputFile)
            reject('No input file provided.')

        if (!account)
            reject('No account provided.')

        if (!isValidAccount)
            reject('Account name provided is not valid.')

        checkFileExistence(inputFile)
            .then((result) => {
                return resolve(result)
            })
            .catch(handleError)
    })
}

// checkInputValidity()

// checkFileExistence(inputFile)
//     .then(parseFile)
//     .then(insertLinesIntoDatabase)
//     .catch(handleError)
