var db = require('../db');
var requireAuth = require('../middlewares/middleware').requireAuth;

module.exports = function(app, express) {
    var question = express.Router();

    question.get('/', function(req, res) {

        db.question.findAll({
            attributes: ['id', 'title', 'content', 'tags', 'createdAt'],
            include: [{
                model: db.user,
                attributes: ['id', 'username']
            }]
        }).then(function(questions) {
            res.send(questions);
        }, function() {
            res.status(500).send();
        });

    });

    question.get('/:id', function(req, res) {

        var id = parseInt(req.params.id, 10);

        db.question.findOne({
            where: {
                id: id
            },
            attributes: ['id', 'title', 'content', 'tags', 'createdAt'],
            include: [{
                model: db.user,
                attributes: ['id', 'username']
            }, {
                model: db.answer,
                attributes: ['id', 'content', 'createdAt'],
                include: [{
                    model: db.user,
                    attributes: ['id', 'username']
                }]
            }]
        }).then(function(question) {
            if (question) {
                res.send(question);
            } else {
                res.status(404).send();
            }
        }, function() {
            res.status(500).send();
        });

    });

    question.post('/answer', requireAuth, function(req, res) {

        if (typeof req.body.content !== 'string' || typeof req.body.questionId !== 'string') {
            return res.status(400).json({
                error: 'Invalid data format!'
            });
        }

        db.answer.create({
            content: req.body.content,
            questionId: req.body.questionId,
            userId: req.decoded.id
        }).then(function(answer) {
            //return the question
            db.question.findOne({
                where: {
                    id: answer.get('questionId')
                },
                attributes: ['id', 'title', 'content', 'tags', 'createdAt'],
                include: [{
                    model: db.user,
                    attributes: ['id', 'username']
                }, {
                    model: db.answer,
                    attributes: ['id', 'content', 'createdAt'],
                    include: [{
                        model: db.user,
                        attributes: ['id', 'username']
                    }]
                }]
            }).then(function(question) {
                if (question) {
                    res.send(question);
                } else {
                    res.status(404).send();
                }
            }, function() {
                res.status(500).send();
            });


        }, function(err) {
            console.log(err);
            res.status(500).send();
        });

    });

    question.post('/create', requireAuth, function(req, res) {

        if (typeof req.body.title !== 'string' || typeof req.body.content !== 'string' || typeof req.body.tags !== 'string') {
            //400
            return res.status(400).json({
                error: 'Invalid data format!'
            });
        }

        db.question.create({
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags,
            userId: req.decoded.id
        }).then(function(question) {
            res.send(question);
        }, function(err) {
            res.status(500).send();
        });
    });

    question.post('/update', requireAuth, function(req, res) {


    });

    question.get('/delete/:id', requireAuth, function(req, res) {


    });

    return question;

}
