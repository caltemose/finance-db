const args = require('args')
const fs = require('fs')
const path = require('path')
const linereader = require('line-reader')
const Promise = require('promise')

const VALID_ACCOUNTS = ['usaa-checking', 'usaa-credit']

let lines = []

function isFile (path) {
    return fs.statSync(path).isFile()
}

function isValidAccount (account) {
    return VALID_ACCOUNTS.includes(account)
}

/*
Parse arguments
    reject if missing

Read file by line
    convert line to db document with original data
        create single item for transaction
        process categories converting to known or unknown
    if doc is not a duplicate of an existing db doc
        insert it into the db
*/

function init () {
    args
        .option('filein', 'The CSV file to parse for bank data')
        .option('account', 'The bank account this data will be associated with')
    const flags = args.parse(process.argv)

    // check inputFile argument
    let inputFile = flags.filein
    if (!inputFile)
        return console.error('No Input File Provided.')
    
    // check inputFile exists
    inputFile = path.resolve(__dirname, inputFile)
    if (!isFile(inputFile))
        return console.log('Input file does not exist at ' + inputFile)

    // check account argument
    let account = flags.account
    if (!account)
        return console.log('No Account Name provided.')
    
    // check account argument is recognized
    if (!isValidAccount(account)) 
        return console.log(`Account name provided is not valid. Must be one of: [${VALID_ACCOUNTS.join(', ')}]`)

    parseFile(inputFile, account)
}

function getArgs () {
    args
        .option('filein', 'The CSV file to parse for bank data')
        .option('account', 'The bank account this data will be associated with')
    const flags = args.parse(process.argv)

    let inputFile = flags.filein

    if (!inputFile)
        throw new Error('No input file provided.')
    
    let account = flags.account
    if (!account)
        throw new Error('No account name provided.')
    if (!isValidAccount(account))
        throw new Error(`Account name provided is not valid. Must be one of: [${VALID_ACCOUNTS.join(', ')}]`)

    return [inputFile, account]
}

function checkFile (inputFile) {
    // return promise that checks to see if file exists using fs.stat()
    return new Promise((fulfill, reject) => {
        fs.stat(inputFile, (err, stats) => {
            if (err) {
                reject(new Error('A file does not exist at this path: ' + inputFile))
            } else {
                fulfill(true)
            }
        })
    })
}

function parseFile (inputFile, account) {
    linereader.eachLine(inputFile, (line, last) => {
        // get object from line
        let original = getObjectFromLine(line)
        if (original) {
            // clean original data
            let cleaned = getCleanDataFromOriginal(original)
            // push line object into global array
            lines.push(cleaned)
        }
        // write final array to database
        if (last && !testing) {
            writeToDb()
        }
    })
}


const options = getArgs()
checkFile(options[0])
    .then(parseFile(options[0], options[1])
    .then((result) => { console.log('SUCCESS', result) })
    .catch((reason) => { console.log('ERROR', reason) })

