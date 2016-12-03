const fs = require('fs')
const path = require('path')
const linereader = require('line-reader')
const MongoClient = require('mongodb').MongoClient
const matches = require('./matches')

//
// Check for existence of CSV file
//

function checkForFile () {
    fs.stat(fileIn, (err, stat) => {
        if (err) {
            console.error('Problem with file: ', fileIn)
            console.error(err)
            return false
        }
        readFile()
    })
}

//
//  Read CSV File
//

function readFile () {
    linereader.eachLine(fileIn, (line, last) => {
        // get object from line
        let original = getObjectFromLine(line)
        if (original) {
            // clean original data
            let cleaned = getCleanDataFromOriginal(original)
            // push line object into global array
            lines.push(cleaned)
        }
        // write final array to database
        if (last) writeToDb()
    })
}

//
//  Convert Lines to Object Retaining Original Data
//

function getObjectFromLine (line) {
    // this parsing is based on the USAA export data format
    const split = line.split(',')
    // something's not right with the data if there are less than 6 items
    if (split.length < 6) return null
    // create the object to return and populate it with data
    let obj = {}
    obj.date = new Date(split[2])
    obj.description = split[4]
    obj.category = split[5]
    let amt = split[6]
    // positive values start with 2 dashes
    amt = amt.replace('--', '')
    obj.amount = parseFloat(amt)
    return obj
}

//
//  Create Pure/Clean Data from Original
//

function getCleanDataFromOriginal (original) {
    let cleaned = {}
    cleaned.original = original
    cleaned.amount = original.amount
    cleaned.date = original.date
    cleaned.account = account

    // helper function to improve payee/category
    cleaned = getPayeeAndCategory(cleaned)

    return cleaned
}

//
//  Convert original description and category to expected/known values
//

function getPayeeAndCategory (line) {
    // TODO compare to clean data model and convert if matched
    line.payee = fixDescription(line.original.description)
    line.category = line.original.category
    return line
}

function fixDescription (description) {
    const searches = matches.searches
    for (var i=0; i<searches.length; i++) {
        if (description.toLowerCase().indexOf(searches[i].search) > -1) {
            return searches[i].replace;
        }
    }
    return description;
}

//
//  Write Data to Database
//

function writeToDb () {
    MongoClient.connect('mongodb://localhost:27017/finances-db', (err, db) => {
        console.log("Connected successfully to server");
        const collection = db.collection('transactions')
        collection.insertMany(lines, (err, res) => {
            if (err) {
                console.error('Could not insert documents into MongoDB')
                db.close()
                return console.error(err)
            }
            console.log('Transactions added to Mongo:', res.ops.length)
            db.close()
        })
    })
}


//
//  Init
//

// check arguments
const fileArg = process.argv[2]
if (!fileArg) return console.error('No Input File Provided.')

const account = process.argv[3]
// TODO check this against an ENUM to ensure good account names provided
if (!account) return console.log('No Account Name provided.')

// where final data is stored before inserted into DB
let lines = []

// determine full path name to file
let fileIn = path.normalize(__dirname + '/../financial-data/csv/' + fileArg)

// check file/kick off actions
checkForFile()
