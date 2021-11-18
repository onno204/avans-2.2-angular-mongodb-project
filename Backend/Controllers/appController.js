App = require('./../Models/appModel');

exports.index = function (req, res) {
    App.get(function (err, req) {
        if (err) {
            return res.status(400).json({
                success: false,
                data: err
            });
        }
        res.status(200).json({
            success: true,
            data: req
        });
    });
};

exports.new = function (req, res) {
    const app = new App();
    app.name = req.body.name ? req.body.name : app.name;
    app.gender = req.body.gender;
    app.email = req.body.email;
    app.phone = req.body.phone;
    // save the app and check for errors
    app.save(function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                data: err
            });
        }
        res.status(201).json({
            success: true,
            data: app
        });
    });
};

exports.view = function (req, res) {
    App.findById(req.params.app_id, function (err, app) {
        if (err) {
            return res.status(400).json({
                success: false,
                data: err
            });
        }
        res.status(200).json({
            success: true,
            data: app
        });
    });
};

exports.update = function (req, res) {
    App.findById(req.params.app_id, function (err, app) {
        if (err)
            res.send(err);
        app.name = req.body.name ? req.body.name : app.name;
        app.gender = req.body.gender;
        app.email = req.body.email;
        app.phone = req.body.phone;

        app.save(function (err) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    data: err
                });
            }
            res.status(202).json({
                success: true,
                data: app
            });
        });
    });
};

exports.delete = function (req, res) {
    App.remove({
        _id: req.params.app_id
    }, function (err, app) {
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
