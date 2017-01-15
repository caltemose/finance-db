const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const linereader = require('line-reader')

router.post('/', (req, res) => {
    const file = path.normalize(__dirname + '/../../../financial-data/csv/' + req.body.file)
    // check for file
    fs.stat(file, (err, stat) => {
        if (err) {
            console.error('Problem with file: ', file)
            console.error(err)
            return res.status(400).jsonp({ err })
        }

        let lines = []

        // file exists, read it
        linereader.eachLine(file, (line, last) => {
            // get object from line
            let original = getObjectFromLine(line)
            if (original) {
                // clean original data
                let cleaned = getCleanDataFromOriginal(original, req.body.account)
                // push line object into global array
                lines.push(cleaned)
            }
            // write final array to database
            if (last) {
                return res.jsonp({ lines })
            }
        })
    })
})

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

function getCleanDataFromOriginal (original, account) {
    let cleaned = {}
    cleaned.original = original
    cleaned.amount = original.amount
    cleaned.date = original.date
    cleaned.account = account
    //
    // // helper function to improve payee/category
    // cleaned = getPayeeAndCategory(cleaned)

    return cleaned
}

function getPayeeAndCategory (line) {
    // TODO compare to clean data model and convert if matched
    // TODO if no edited description, run description through cleaner
    line.payee = line.original.descriptionEdited ? line.original.descriptionEdited : line.original.description
    line.category = line.original.category.toLowerCase()
    return line
}

// function fixDescription (description) {
//     const searches = matches.searches
//     for (var i=0; i<searches.length; i++) {
//         if (description.toLowerCase().indexOf(searches[i].search) > -1) {
//             return searches[i].replace;
//         }
//     }
//     return description;
// }

module.exports = router
