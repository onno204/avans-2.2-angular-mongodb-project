const router = require('express').Router();
const jwt = require("jsonwebtoken");
router.get('/', function (req, res) {
    res.json({
        success: false,
        message: 'Welcome to the avans-app API!'
    });
});

const appController = require('./Controllers/appController');
const commentsController = require('./Controllers/commentsController');
const usersController = require('./Controllers/usersController');
const userRelationsController = require('./Controllers/userRelationsController');
const devicesController = require('./Controllers/devicesController');

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null || token.length === 0) return res.sendStatus(401)

    jwt.verify(token, key, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

function adminOnlyRoute(req, res, next) {
    console.log("user", req.user);
    if (req.user.role !== "admin") {
        return res.sendStatus(403)
    }
    next();
}

router.route('/login').post(usersController.login)
router.route('/register').post(usersController.register)

router.route('/apps')
    .get(appController.index)
    .post(authenticateToken, appController.new);

router.route('/apps/:app_id')
    .get(appController.view)
    .patch(authenticateToken, appController.update)
    .put(authenticateToken, appController.update)
    .delete(authenticateToken, appController.delete);

router.route('/comments')
    .get(commentsController.index)
    .post(authenticateToken, commentsController.new);

router.route('/comments/:comment_id')
    .get(commentsController.view)
    .patch(authenticateToken, commentsController.update)
    .put(authenticateToken, commentsController.update)
    .delete(authenticateToken, commentsController.delete);


router.route('/user/known_by').get(authenticateToken, userRelationsController.getKnownBy)
router.route('/user/relations').get(authenticateToken, userRelationsController.getRelations)
router.route('/user/relation/:user_id')
    .post(authenticateToken, userRelationsController.addRelation)
    .delete(authenticateToken, userRelationsController.removeRelation)


// Admin routes
router.route('/users')
    .get(authenticateToken, adminOnlyRoute, usersController.index)
    .post(authenticateToken, adminOnlyRoute, usersController.new);

router.route('/users/:user_id')
    .get(authenticateToken, adminOnlyRoute, usersController.view)
    .patch(authenticateToken, adminOnlyRoute, usersController.update)
    .put(authenticateToken, adminOnlyRoute, usersController.update)
    .delete(authenticateToken, adminOnlyRoute, usersController.delete);

router.route('/devices')
    .get(authenticateToken, devicesController.index)
    .post(authenticateToken, adminOnlyRoute, devicesController.new);

router.route('/devices/:device_id')
    .get(authenticateToken, devicesController.view)
    .patch(authenticateToken, adminOnlyRoute, devicesController.update)
    .put(authenticateToken, adminOnlyRoute, devicesController.update)
    .delete(authenticateToken, adminOnlyRoute, devicesController.delete);


module.exports = router;
