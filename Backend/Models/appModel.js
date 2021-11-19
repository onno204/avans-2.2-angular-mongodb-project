const mongoose = require('mongoose');

const appSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    public: Boolean,
    downloadCount: Number,
    icon: String,
    pictures: Array

}, { timestamps: true });

dbModel = module.exports = mongoose.model('app', appSchema);

module.exports.get = function (callback, limit) {
    dbModel.find(callback).limit(limit);
}
