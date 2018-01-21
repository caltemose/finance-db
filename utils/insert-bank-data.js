const args = require('args')
const path = require('path')

const isValidAccount = require('./modules/isValidAccount')
const checkFileExistence = require('./modules/checkFileExistence')
const parseBankFile = require('./modules/parseBankFile')
// const insertLinesIntoDatabase = require('./modules/insertLinesIntoDatabase')
const insertAndDedupe = require('./modules/insertAndDedupe')

function checkArgs () {
    args
        .option('filein', 'The CSV file to parse for bank data')
        .option('account', 'The bank account this data will be associated with')
    const flags = args.parse(process.argv)

    let inputFile = flags.filein
    let account = flags.account

    if (!inputFile)
        handleError('No input file provided.')

    if (!account)
        handleError('No account provided.')

    if (!isValidAccount)
        handleError('Account name provided is not valid.')

    return { inputFile, account }
}


const { inputFile, account } = checkArgs()

checkFileExistence(inputFile)
    .then((result) => {
        return parseBankFile(inputFile, account)
    })
    // .then(insertLinesIntoDatabase)
    .then(insertAndDedupe)
    .catch(error => { throw new Error(error) })
