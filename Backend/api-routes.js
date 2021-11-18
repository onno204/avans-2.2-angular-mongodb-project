const router = require('express').Router();
router.get('/', function (req, res) {
    res.json({
        status: 'The API Is Working',
        message: 'Welcome to the avans-app API!'
    });
});

const appController = require('./Controllers/appController');
router.route('/apps')
    .get(appController.index)
    .post(appController.new);

router.route('/apps/:app_id')
    .get(appController.view)
    .patch(appController.update)
    .put(appController.update)
    .delete(appController.delete);


module.exports = router;
