var jwt = require('jsonwebtoken');

var middleware = {
    requireAuth: function(req, res, next) {
        var token = req.body.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, 'secretkey', function(err, decoded) {
                if (err) {
                    return res.status(403).json({
                        error: 'Failed to authenticate user!'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).json({
                error: 'No token provided!'
            });
        }
    }
};
module.exports = middleware;
