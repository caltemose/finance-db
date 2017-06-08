const linereader = require('line-reader')
const Promise = require('bluebird')
const getObjectFromTransactionLine = require('./getObjectFromTransactionLine')
const getCleanDataFromOriginal = require('./getCleanDataFromOriginal')

module.exports = function parseFile (result) {
    console.log('parseFile', result)
    return new Promise((fulfill, reject) => {
        let lines = []
        linereader.eachLine(options[0], (line, last) => {
            // get object from line
            let original = getObjectFromTransactionLine(line)
            if (original) {
                // clean original data
                let cleaned = getCleanDataFromOriginal(original, account)
                // push line object into global array
                lines.push(cleaned)
            }

            lines.push(line)

            // return final array of lines
            if (last) {
                fulfill(lines)
            }
        })
    })
}
