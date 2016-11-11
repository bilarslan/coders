var db = require('../db');
var requireAuth = require('../middlewares/middleware').requireAuth;

module.exports = function(app, express) {
    var video = express.Router();

    video.get('/', function(req, res) {

        res.send('Coming Soon..');

    });

    return video;
}
