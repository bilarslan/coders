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
            }, {
                model: db.questionRate,
                attributes: ['userId', 'rate'],
                include: [{
                    model: db.user,
                    attributes: ['username']
                }]
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
                },{
                  model: db.answerRate,
                  attributes: ['userId', 'rate'],
                  include:[{
                    model:db.user,
                    attributes: ['id', 'username']
                  }]
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

    question.get('/like/:id', requireAuth, function(req, res) {
        var id = parseInt(req.params.id, 10);
        db.questionRate.findOrCreate({
            where: {
                userId: req.decoded.id,
                questionId: id
            },
            defaults: {
                userId: req.decoded.id,
                questionId: id,
                rate: 1
            }
        }).spread(function(questionRate, created) {
            if (created) {
                res.status(200).json({
                    message: 1
                });
            } else {
                //Update the rate of the question
                //Inc or dec
                var value = questionRate.getDataValue('rate');
                var inc, rate;
                if (value == 1) {
                    rate = 0;
                    inc = -1;
                } else if (value == 0) {
                    rate = 1;
                    inc = 1;
                } else if (value == -1) {
                    rate = 1;
                    inc = 2;
                }
                questionRate.update({
                    rate: rate
                }).then(function() {
                    res.status(200).json({
                        message: inc
                    });
                });
            }
        });
    });

    question.get('/dislike/:id', requireAuth, function(req, res) {
        var id = parseInt(req.params.id, 10);
        db.questionRate.findOrCreate({
            where: {
                userId: req.decoded.id,
                questionId: id
            },
            defaults: {
                userId: req.decoded.id,
                questionId: id,
                rate: -1
            }
        }).spread(function(questionRate, created) {
            if (created) {
                res.status(200).json({
                    message: -1
                });
            } else {
                //Update the rate of the question
                //Inc or dec
                var value = questionRate.getDataValue('rate');
                var inc, rate;
                if (value == 1) {
                    rate = -1;
                    inc = -2;
                } else if (value == 0) {
                    rate = -1;
                    inc = -1;
                } else if (value == -1) {
                    rate = 0;
                    inc = 1;
                }
                questionRate.update({
                    rate: rate
                }).then(function() {
                    res.status(200).json({
                        message: inc
                    });
                });
            }
        });
    });

    question.get('/like_answer/:id', requireAuth, function(req, res) {
      var id = parseInt(req.params.id, 10);
      db.answerRate.findOrCreate({
          where: {
              userId: req.decoded.id,
              answerId: id
          },
          defaults: {
              userId: req.decoded.id,
              answerId: id,
              rate: 1
          }
      }).spread(function(answerRate, created) {
          if (created) {
              res.status(200).json({
                  message: 1
              });
          } else {
              //Update the rate of the question
              //Inc or dec
              var value = answerRate.getDataValue('rate');
              var inc, rate;
              if (value == 1) {
                  rate = 0;
                  inc = -1;
              } else if (value == 0) {
                  rate = 1;
                  inc = 1;
              } else if (value == -1) {
                  rate = 1;
                  inc = 2;
              }
              answerRate.update({
                  rate: rate
              }).then(function() {
                  res.status(200).json({
                      message: inc
                  });
              });
          }
      });

    });

    question.get('/dislike_answer/:id', requireAuth, function(req, res){

      var id = parseInt(req.params.id, 10);
      db.answerRate.findOrCreate({
          where: {
              userId: req.decoded.id,
              answerId: id
          },
          defaults: {
              userId: req.decoded.id,
              answerId: id,
              rate: -1
          }
      }).spread(function(answerRate, created) {
          if (created) {
              res.status(200).json({
                  message: -1
              });
          } else {
              //Update the rate of the question
              //Inc or dec
              var value = answerRate.getDataValue('rate');
              var inc, rate;
              if (value == 1) {
                  rate = -1;
                  inc = -2;
              } else if (value == 0) {
                  rate = -1;
                  inc = -1;
              } else if (value == -1) {
                  rate = 0;
                  inc = 1;
              }
              answerRate.update({
                  rate: rate
              }).then(function() {
                  res.status(200).json({
                      message: inc
                  });
              });
          }
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
