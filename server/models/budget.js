var mongoose = require('mongoose');

var schema = mongoose.Schema({
    createdOn: { type: Date, required: true },
    startDate: { type: Date, required: true },
    categories: { type: Object, required: true }
});

module.exports = mongoose.model('Budget', schema);
