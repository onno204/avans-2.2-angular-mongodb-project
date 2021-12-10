const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: 1
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin'
    },
}, { timestamps: true });

dbModel = module.exports = mongoose.model('users', usersSchema);

// module.exports.get = function (callback, limit) {
//     dbModel.find(callback).limit(limit);
// }
