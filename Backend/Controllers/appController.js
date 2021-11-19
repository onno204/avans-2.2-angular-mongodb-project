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
    for (const [key, value] of Object.entries(req.body)) {
        app[key] = value
    }
    // save the app and check for errors
    app.save(function (err) {
        if (err && Object.values(err).length > 0) {
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
        if (err) {
            return res.status(400).json({
                success: false,
                data: err
            });
        }
        delete req.body._id;
        for (const [key, value] of Object.entries(req.body)) {
            app[key] = value
        }

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
