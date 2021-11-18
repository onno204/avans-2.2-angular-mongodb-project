const mongoose = require('mongoose');

const appSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comments: Object,
    phone: String

}, { timestamps: true });

dbModel = module.exports = mongoose.model('app', appSchema);

module.exports.get = function (callback, limit) {
    dbModel.find(callback).limit(limit);
}