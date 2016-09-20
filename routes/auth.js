var jwt = require('jsonwebtoken');

module.exports = function(app, express){
    var auth = express.Router();

    auth.post('/signup', function(req, res){

    });

    auth.post('/signin', function(req, res){

    });

    auth.get('/signout', function(req, res){

    });
    return auth;
}

function createToken(user){
    var token = jwt.sign({
      //user info
    },"secretkey",{
       expiresIn : 60*24
    });
    return token;
}
