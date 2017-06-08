const Promise = require('bluebird')
const fs = require('fs')
// const fs = Promise.promisifyAll(require('fs'))

function myPromise () {
    return new Promise((resolve, reject) => {
        fs.stat('./matches.js', (err, stats) => {
            if (err) {
                reject(err)
            } else {
                resolve('./matches.js exists')
            }
        })
    })
}

function handleMyPromise (result) {
    console.log(result)
    return new Promise((resolve, reject) => {
        fs.stat('./index.js', (err, stats) => {
            if (err) {
                reject(err)
            } else {
                resolve('./index.js exists')
            }
        })
    })
}

myPromise()
    .then(handleMyPromise)
    .then((result) => {
        console.log(result)
    })
    .catch((err) => {
        console.log(err)
    })
