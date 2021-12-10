Device = require('./../Models/devicesModel');
const loginController = require('./loginController');

exports.index = function (req, res) {
    Device.find({}, function (err, req) {
        if (err) {
            return res.status(400).json({
                success: false,
                data: err
            });
        }
        res.status(200).json({
            success: true,
            data: req,
        });
    });
};

exports.new = function (req, res) {
    const device = new Device();
    for (const [key, value] of Object.entries(req.body)) {
        device[key] = value
    }
    // save the device and check for errors
    device.save(function (err) {
        if (err && Object.values(err).length > 0) {
            return res.status(400).json({
                success: false,
                data: err
            });
        }
        res.status(201).json({
            success: true,
            data: device
        });
    });
};

exports.view = function (req, res) {
    Device.findById(req.params.device_id, function (err, device) {
        if (err) {
            return res.status(400).json({
                success: false,
                data: err
            });
        }
        res.status(200).json({
            success: true,
            data: device
        });
    });
};

exports.update = function (req, res) {
    Device.findById(req.params.device_id, function (err, device) {
        if (err) {
            return res.status(400).json({
                success: false,
                data: err
            });
        }
        delete req.body._id;
        for (const [key, value] of Object.entries(req.body)) {
            device[key] = value
        }

        device.save(function (err) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    data: err
                });
            }
            res.status(202).json({
                success: true,
                data: device
            });
        });
    });
};

exports.delete = function (req, res) {
    Device.remove({
        _id: req.params.device_id
    }, function (err, device) {
        if (err) {
            return res.status(400).json({
                success: false,
                data: err
            });
        }
        res.status(202).json({
            success: true
        });
    });
};
