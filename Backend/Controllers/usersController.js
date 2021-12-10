User = require('./../Models/usersModel');
const loginController = require('./loginController');

exports.index = function (req, res) {
    const email = req.query.email || "";
    User.find({email: email}, function (err, req) {
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
    const user = new User();
    for (const [key, value] of Object.entries(req.body)) {
        user[key] = value
    }
    // save the user and check for errors
    user.save(function (err) {
        if (err && Object.values(err).length > 0) {
            return res.status(400).json({
                success: false,
                data: err
            });
        }
        res.status(201).json({
            success: true,
            data: user
        });
    });
};

exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) {
            return res.status(400).json({
                success: false,
                data: err
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    });
};

exports.update = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) {
            return res.status(400).json({
                success: false,
                data: err
            });
        }
        delete req.body._id;
        for (const [key, value] of Object.entries(req.body)) {
            user[key] = value
        }

        user.save(function (err) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    data: err
                });
            }
            res.status(202).json({
                success: true,
                data: user
            });
        });
    });
};

exports.delete = function (req, res) {
    User.remove({
        _id: req.params.user_id
    }, function (err, user) {
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


exports.login = function (req, res) {
    loginController.login(req.body.email, req.body.password, (err, result) => {
        if (err) {
            return res.status(401).json({
                success: false,
                data: err
            });
        }
        res.status(200).json({
            success: true,
            data: result
        });
    });
};

exports.register = function (req, res) {
    loginController.add(req.body.email, req.body.password, (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                data: err
            });
        }
        res.status(200).json({
            success: true,
            data: result
        });
    });
};
