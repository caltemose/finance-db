const fs = require('fs')
const path = require('path')
const linereader = require('line-reader')
const MongoClient = require('mongodb').MongoClient
const matches = require('./matches')

const testing = false // does not write to database if true

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
        if (last && !testing) {
            writeToDb()
        }
    })
}

//
//  Convert Lines to Object Retaining Original Data
//

function getObjectFromLine (line) {
    // this parsing is based on the USAA export data format

    // first we have to search for blank values (posted,,)
    // and change them so they aren't omitted by the regex lower in the code
    const BLANK = 'BLANK'
    var arr = line.split(',')
    var newArr = []
    for(var i=0; i<arr.length; i++) {
        var value = arr[i] === '' ? BLANK : arr[i]
        newArr.push(value)
    }
    var newLine = newArr.join(',')

    // regular string.split borks because sometimes elements are
    // quoted and contain the delimiter within quotes like so:
    // posted,,10/13/2016,Huge Salary,"HUGE, LLC",Work Income - Salary,"20.00"
    // see: http://stackoverflow.com/questions/11456850/split-a-string-by-commas-but-ignore-commas-within-double-quotes-using-javascript
    // and see the comments since the first RE has issues with spaces between words
    var split = newLine.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);

    // ignore null splits (probably extra lines in file)
    // something's not right with the data if there are less items than expected
    if (!split || split.length < 6) {
        console.log('IGNORING LINE')
        console.log(line)
        return null
    }

    // create the object to return and populate it with data
    let obj = {}
    obj.date = new Date(split[2])
    obj.descriptionEdited = split[3] === BLANK ? '' : split[3]
    obj.description = split[4] === BLANK ? '' : split[4]
    obj.category = split[5] === BLANK ? 'uncategorized' : split[5]
    let amt = split[6]
    // for some reason amounts are sometimes surrounded by quotes
    amt = amt.replace('"', '')
    // positive values might start with 2 dashes
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
    // TODO if no edited description, run description through cleaner
    line.payee = line.original.descriptionEdited ? line.original.descriptionEdited : line.original.description
    line.category = line.original.category.toLowerCase()
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

// node index.js 2017-02-usaa-checking.csv usaa-checking