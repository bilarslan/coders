var db = require('../db');
var requireAuth = require('../middlewares/middleware').requireAuth;

module.exports = function(app, express) {
    var question = express.Router();

    question.get('/all', function(req, res) {


    });

    question.get('/:id', function(req, res) {


    });

    question.post('/create', requireAuth, function(req, res) {


    });

    question.post('/update', requireAuth, function(req, res) {


    });

    question.get('/delete/:id', requireAuth, function(req, res) {


    });

    return question;

}
