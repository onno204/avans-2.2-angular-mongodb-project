const router = require('express').Router();
router.get('/', function (req, res) {
    res.json({
        success: false,
        message: 'Welcome to the avans-app API!'
    });
});

const appController = require('./Controllers/appController');
const commentsController = require('./Controllers/commentsController');

router.route('/apps')
    .get(appController.index)
    .post(appController.new);

router.route('/apps/:app_id')
    .get(appController.view)
    .patch(appController.update)
    .put(appController.update)
    .delete(appController.delete);

router.route('/comments')
    .get(commentsController.index)
    .post(commentsController.new);

router.route('/comments/:comment_id')
    .get(commentsController.view)
    .patch(commentsController.update)
    .put(commentsController.update)
    .delete(commentsController.delete);


module.exports = router;
