var mongoose = require('mongoose');

var schema = mongoose.Schema({
    original: {
        amount: Number,
        category: String,
        date: Date,
        description: String,
        account: String
    },
    category: String,
    amount: Number,
    date: Date,
    account: String,
    payee: String,
    notes: String,
    split: [
        { amount: Number, category: String, notes: String }
    ]
});

module.exports = mongoose.model('Transaction', schema);
