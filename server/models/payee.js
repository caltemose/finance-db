var mongoose = require('mongoose');

var schema = mongoose.Schema({
    payee: { type: String, required: true }
});

module.exports = mongoose.model('Payee', schema);
