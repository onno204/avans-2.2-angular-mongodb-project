App = require('./../Models/appModel');

exports.index = function (req, res) {
    const page = req.query.page || 0;
    const pageSize = req.query.nolimit !== undefined ? 5000 : 5;
    App.count(function (err, count) {

        App.find(function (err, req) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    data: err
                });
            }
            res.status(200).json({
                success: true,
                data: req,
                hasMore: count > ((pageSize * page) + pageSize)
            });
        }).skip(pageSize * page).limit(pageSize);
    })
};

exports.new = function (req, res) {
    const app = new App();
    for (const [key, value] of Object.entries(req.body)) {
        app[key] = value
    }
    app.user_id = req.user.user_id
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
        if (err || app === null) {
            return res.status(400).json({
                success: false,
                data: err
            });
        }

        if (app.user_id !== req.user.user_id) {
            return res.status(400).json({
                success: false,
                data: {
                    message: 'App not owned by you'
                }
            });
        }
        delete req.body._id;
        for (const [key, value] of Object.entries(req.body)) {
            app[key] = value
        }

        app.user_id = app.user_id ? app.user_id : req.user.user_id

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
    App.findById(req.params.app_id, function (err, app) {
        if (err || app === null) {
            return res.status(400).json({
                success: false,
                data: err
            });
        }

        if (app.user_id !== req.user.user_id) {
            return res.status(400).json({
                success: false,
                data: {
                    message: 'App not owned by you'
                }
            });
        }

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
    });
};
