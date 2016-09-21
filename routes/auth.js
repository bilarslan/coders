var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');
var db = require('../db');

module.exports = function(app, express) {
        var auth = express.Router();

        auth.post('/signup', function(req, res) {
            if (typeof req.body.name !== 'string' || typeof req.body.username !== 'string' || typeof req.body.email !== 'string' || typeof req.body.password !== 'string') {
                //Return error: invalid format
            }

            db.user.findOrCreate({
                where: {
                    $or: [{
                        email: req.body.email
                    }, {
                        username: req.body.username
                    }]
                },
                defaults: {
                    email: req.body.email,
                    name: req.body.name,
                    username: req.body.username,
                    password: req.body.password
                }
            }).spread(function(_user, created) {
                if (created) {
                    //Return token - user created
                } else {
                    //Return error: user already exist
                }
            });
        });

        auth.post('/signin', function(req, res) {
            if (typeof req.body.username !== 'string' || typeof req.body.password !== 'string') {
                //Return error: invalid format
            }

            db.user.findOne({
                where: {
                    username: req.body.username
                }
            }).then(function(_user) {
                if (!_user || !bcrypt.compareSync(req.body.password, _user.get('password'))) {
                    //Return error: invalid username or password
                }
                //Return token - user signed in!
            });
        });

        auth.get('/signout', function(req, res) {

        });
        return auth;
    }
    //move createtoken to user model
function createToken(user) {
    var token = jwt.sign({
        //user info
    }, "secretkey", {
        expiresIn: 60 * 24
    });
    return token;
}
