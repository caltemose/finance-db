const MongoClient = require('mongodb').MongoClient

function deleteTransactions () {
    MongoClient.connect('mongodb://localhost:27017/finances-db', (err, db) => {
        console.log("Connected successfully to server");
        const collection = db.collection('transactions')
        collection.drop((err, res) => {
            if (err) {
                console.error('Could not drop collection:', 'transactions')
                db.close()
                return console.error(err)
            }
            console.log('Collection dropped:', res)
            db.close()
        })
    })
}

deleteTransactions()
