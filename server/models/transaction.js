var mongoose = require('mongoose');

var schema = mongoose.Schema({
    original: {
        amount: Number,
        category: String,
        date: Date,
        description: String,
        account: String
    },
    amount: Number,
    date: Date,
    account: String,
    payee: String,
    notes: String,
    items: [
        { amount: Number, category: String, description: String }
    ]
});

module.exports = mongoose.model('Transaction', schema);
