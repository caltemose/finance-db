const Promise = require('bluebird')
const loadJsonFile = require('load-json-file')
const convertTransactionToV2 = require('./convertTransactionToV2')

module.exports = function (inputFile) {
    console.log('convertToV2:', inputFile)
    return new Promise((resolve, reject) => {
        let lines = []
        loadJsonFile(inputFile).then(json => {
            lines = json.docs.map(convertTransactionToV2)
            resolve(lines)
        }).catch(err => {
            reject(err)
        })
    })
}