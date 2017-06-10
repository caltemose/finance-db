const Promise = require('bluebird')
const fs = require('fs')

module.exports = function checkFileExistence (inputFile) {
    // return promise that checks to see if file exists using fs.stat()
    return new Promise((resolve, reject) => {
        fs.stat(inputFile, (err, stats) => {
            if (err) {
                reject(new Error('A file does not exist at this path: ' + inputFile))
            } else {
                resolve(inputFile)
            }
        })
    })
}
