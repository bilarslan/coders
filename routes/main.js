var requireAuth = require('../middlewares/middleware').requireAuth;

module.exports = function(app, express) {
    var main = express.Router();

    main.get('/get', requireAuth, function(req, res) {
        res.send('Hey! ' + req.decoded.username);
    });

    return main;
}
