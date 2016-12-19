var mongoose = require('mongoose');

var schema = mongoose.Schema({
    category: String,
    inBudget: { type: Boolean, default: false }
});

module.exports = mongoose.model('Category', schema);
