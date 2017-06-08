const Promise = require('bluebird')

module.exports = function insertLinesIntoDatabase (lines) {
    console.log('insertDataIntoDatabase', lines.length)
    return new Promise((fulfill, reject) => {
        console.log(lines.length + ' items inserted into database')
        fulfill('x items inserted into database')
    })
}
