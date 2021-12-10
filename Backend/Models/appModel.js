const mongoose = require('mongoose');

const appSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
    icon: {
        type: String,
        required: true
    },
    pictures: Array

}, { timestamps: true });

dbModel = module.exports = mongoose.model('app', appSchema);
