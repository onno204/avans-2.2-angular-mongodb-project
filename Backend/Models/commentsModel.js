const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    appId: {
        type: String,
        required: true,
        index: 1
    },
}, { timestamps: true });

dbModel = module.exports = mongoose.model('comments', commentsSchema);

// module.exports.get = function (callback, limit) {
//     dbModel.find(callback).limit(limit);
// }
