const Promise = require('bluebird')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const config = require('../../config')

module.exports = function insertAndDedupe (lines) {
    return new Promise((resolve, reject) => {
        // TODO pass mongo URL through arguments instead of hard-coding it
        MongoClient.connect('mongodb://localhost:27017/' + config.db, (err, db) => {
            if (err) {
                reject(err)
            }

            let payees, categories

            // first get payees from db
            const payeeCollection = db.collection('payees')
            payeeCollection.find().toArray((err, docs) => {
                if (err) throw err
                payees = docs

                // then get categories from db
                const categoryCollection = db.collection('categories')
                categoryCollection.find().toArray((err, docs) => {
                    if (err) throw err
                    categories = docs

                    // update properties on line items so that
                    // dates are date objects, ids are ObjectIds, etc
                    lines = lines.map(update)

                    const collection = db.collection('transactions')
                    // for each line, search the db for identical transactions
                    // so they are not inserted into the db
                    lines.forEach((line, index) => {
                        collection.find({
                            date: line.date,
                            amount: line.amount,
                            "original.description": line.original.description
                        }).toArray((err, docs) => {
                            if (!docs.length) {
                                // a match was not found so try to normalize the data
                                // by matching payees updating them to known payees
                                // also updates category if a default is known
                                line = updatePayee(line, payees, categories)

                                // insert the new item into the db
                                collection.insertOne(line, (err, doc) => {
                                    // exit if final transaction
                                    if (index === lines.length -1) {
                                        console.log('done')
                                        db.close()
                                    }
                                })
                            } else {
                                // match found, exit if final transaction
                                console.log('matching transaction found')
                                if (index === lines.length -1) {
                                    console.log('done')
                                    db.close()
                                }
                            }
                        })
                    })
                })
            })
        })
    })
}

// given a payee line object and the arrays of payees and categories,
// search the payee matches to see if this line object's payee is recognized
// and if so, normalize the payee data and optionally apply a category if
// a default category is defined for the found payee
function updatePayee (line, payees, categories) {
    for(let i=0; i<payees.length; i++) {
        // not all payees have a matches array with payee names to search for
        if (payees[i].matches) {
            for(let j=0; j<payees[i].matches.length; j++) {
                if (line.payee.toLowerCase().indexOf(payees[i].matches[j].toLowerCase()) > -1) {
                    line.payee = payees[i].payee
                    line.payeeId = payees[i]._id
                    if (payees[i].defaultCategory) {
                        if (line.items[0]) {
                            const categoryId = getCategoryIdByName(payees[i].defaultCategory, categories)
                            if (categoryId) {
                                line.items[0].categoryId = categoryId
                                line.items[0].category = payees[i].defaultCategory
                            }
                            // console.log('updated line w/category:', line.payee, ',', line.items[0].category)
                            return line
                        }
                    }
                    // console.log('updated line:', line.payee)
                    return line
                }
            }
        }
    }
    // console.log('unchanged line:', line.payee)
    return line
}

function getCategoryIdByName (name, categories) {
    for(let i=0; i<categories.length; i++) {
        if (categories[i].category === name) {
            return categories[i]._id
        }
    }
    return null
}

function updateDocId (doc) {
    doc._id = new ObjectId(doc._id)
    return doc
}

function updateDates (doc) {
    if (doc.date) {
        doc.date = new Date(doc.date)
    }
    if (doc.original && doc.original.date) {
        doc.original.date = new Date(doc.date)
    }
    if (doc.createdOn) {
        doc.createdOn = new Date(doc.createdOn)
    }
    if (doc.startDate) {
        doc.startDate = new Date(doc.startDate)
    }
    return doc
}

function update (doc) {
    doc = updateDocId(doc)
    doc = updateDates(doc)
    return doc
}
