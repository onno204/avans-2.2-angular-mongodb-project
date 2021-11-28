Comment = require('./../Models/commentsModel');

exports.index = function (req, res) {
    const commentId = req.query.commentId || "";
    Comment.find({commentId: commentId}, function (err, req) {
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
    const comment = new Comment();
    for (const [key, value] of Object.entries(req.body)) {
        comment[key] = value
    }
    // save the comment and check for errors
    comment.save(function (err) {
        if (err && Object.values(err).length > 0) {
            return res.status(400).json({
                success: false,
                data: err
            });
        }
        res.status(201).json({
            success: true,
            data: comment
        });
    });
};

exports.view = function (req, res) {
    Comment.findById(req.params.comment_id, function (err, comment) {
        if (err) {
            return res.status(400).json({
                success: false,
                data: err
            });
        }
        res.status(200).json({
            success: true,
            data: comment
        });
    });
};

exports.update = function (req, res) {
    Comment.findById(req.params.comment_id, function (err, comment) {
        if (err) {
            return res.status(400).json({
                success: false,
                data: err
            });
        }
        delete req.body._id;
        for (const [key, value] of Object.entries(req.body)) {
            comment[key] = value
        }

        comment.save(function (err) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    data: err
                });
            }
            res.status(202).json({
                success: true,
                data: comment
            });
        });
    });
};

exports.delete = function (req, res) {
    Comment.remove({
        _id: req.params.comment_id
    }, function (err, comment) {
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
