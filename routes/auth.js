var bcrypt = require('bcrypt-nodejs');
var db = require('../db');
var requireAuth = require('../middlewares/middleware').requireAuth;

module.exports = function(app, express) {
    var auth = express.Router();

    auth.post('/signup', function(req, res) {
        //Check posted data format
        if (typeof req.body.name !== 'string' || typeof req.body.username !== 'string' || typeof req.body.email !== 'string' || typeof req.body.password !== 'string') {
            //401 - Unauthorized
            return res.status(401).json({
                error: "Invalid data format!"
            });
        }


        //Create user if not existed
        db.user.findOrCreate({
            where: {
                $or: [{
                    email: req.body.email
                }, {
                    username: req.body.username
                }]
            },
            defaults: {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }
        }).spread(function(_user, created) {
            if (created) {
                //Return token - user created
                res.json({
                    username: _user.get('username'),
                    token: _user.generateToken()
                });
            } else {
                //401 - Unauthorized
                res.status(401).json({
                    error: "The user is already exist!"
                });
            }
        });
    });

    auth.post('/signin', function(req, res) {
        //Check posted data format
        if (typeof req.body.username !== 'string' || typeof req.body.password !== 'string') {
            //401 - Unauthorized
            return res.status(401).json({
                error: "Invalid data format!"
            });
        }

        //User sign in
        db.user.findOne({
            where: {
                username: req.body.username
            }
        }).then(function(_user) {
            if (!_user || !bcrypt.compareSync(req.body.password, _user.get('password'))) {
                //401 - Unauthorized
                return res.status(401).json({
                    error: "Wrong username or password!"
                });
            }
            res.json({
                username: _user.get('username'),
                token: _user.generateToken()
            });
        });
    });

    auth.get('/signout', function(req, res) {

    });

    auth.get('/me', requireAuth, function(req, res) {
        res.json(req.decoded);
    });

    auth.get('/profile/:username', function(req, res){
        var username = req.params.username.toString();

        db.user.findOne({
            where:{
              username: username
            },
            attributes:['id','username','createdAt'],
            include:[{
              model: db.question,
              attributes:['id','title','content','tags','createdAt']
            },
            {
              model:db.answer,
              attributes:['id','content','createdAt','questionId']
            }]
        }).then(function(user){
          if(user){
            res.send(user);
          }else{
            res.status(404).send({message:'User Not Found!'});
          }
        });

    });
    return auth;
}
