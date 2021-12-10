User = require('./../Models/usersModel');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";

exports.add = function (email, password, callback) {
    jwt.sign({data: email}, key, {expiresIn: '2h'}, (err, res) => {
        if (err) return callback("Error while creating login token", undefined);
        const hashed = crypto.createHash('sha256').update(password).digest('base64');

        const user = new User();
        user.email = email;
        user.password = hashed;
        user.token = res;
        // save the user and check for errors
        user.save(function (err) {
            if (err && Object.values(err).length > 0) {
                return callback("User registration failed. Try another emailaddress", undefined);
            }
            return exports.login(email, password, callback)
        });
    });
}

exports.login = function (email, password, callback) {
    const hashed = crypto.createHash('sha256').update(password).digest('base64');
    User.findOne({email: email, password: hashed}, function (err, result) {
        if (err || result === null) {
            return callback("User login failed", undefined);
        }
        exports.generateNewToken(result.email, result.role, callback)
    });
}

exports.generateNewToken = function (email, role, callback) {
    jwt.sign({user_email: email, role: role}, key, {expiresIn: '2h'}, (err, res) => {
        if (err) return callback("Error while creating login token", undefined);
        callback(undefined, {token: res, role: role, email: email});
    });
}

