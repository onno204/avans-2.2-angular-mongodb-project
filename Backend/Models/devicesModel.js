const mongoose = require('mongoose');

const devicesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: 1
    }
}, { timestamps: true });

dbModel = module.exports = mongoose.model('devices', devicesSchema);

// module.exports.get = function (callback, limit) {
//     dbModel.find(callback).limit(limit);
// }
