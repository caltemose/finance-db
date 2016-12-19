const MongoClient = require('mongodb').MongoClient
const categories = require('./categories')

function writeToDb (categoryObjects) {
    MongoClient.connect('mongodb://localhost:27017/finances-db', (err, db) => {
        console.log("Connected successfully to server");
        const collection = db.collection('categories')
        collection.insertMany(categoryObjects, (err, res) => {
            if (err) {
                console.error('Could not insert documents into MongoDB')
                db.close()
                return console.error(err)
            }
            console.log('Categories added to Mongo:', res.ops.length)
            db.close()
        })
    })
}

var categoryObjects = []
categories.forEach(function (category) {
    categoryObjects.push({
        category: category
    })
})

writeToDb(categoryObjects)
