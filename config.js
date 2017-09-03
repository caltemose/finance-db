module.exports = {
    db: 'finances-db-v2',
    ports: {
        api: 3333,
        app: 3000
    },
    mongoRoot: 'mongodb://localhost/',
    mongoUrl: function () {
        return this.mongoRoot + this.db
    }
}

/*

main database: 
finances-db-v2

alt/dev database: 
finances-db-alt

*/
