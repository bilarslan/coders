var Sequelize = require('sequelize');
var sequelize = new Sequelize('coders', 'root', '123456', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

var db = {};

db.user = sequelize.import(__dirname + '/models/user.js');
db.question = sequelize.import(__dirname + '/models/question.js');
db.questionRate = sequelize.import(__dirname + '/models/questionRate.js');
db.answer = sequelize.import(__dirname + '/models/answer.js');
db.answerRate = sequelize.import(__dirname + '/models/answerRate.js');
db.playlist = sequelize.import(__dirname + '/models/playlist.js');
db.video = sequelize.import(__dirname + '/models/video.js');
db.videoComment = sequelize.import(__dirname + '/models/videoComment.js');
db.contact = sequelize.import(__dirname + '/models/contact.js');


db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.question.belongsTo(db.user);
db.user.hasMany(db.question);

db.answer.belongsTo(db.user);
db.answer.belongsTo(db.question);
db.user.hasMany(db.answer);
db.question.hasMany(db.answer);

db.questionRate.belongsTo(db.user);
db.questionRate.belongsTo(db.question);
db.user.hasMany(db.questionRate);
db.question.hasMany(db.questionRate);

db.answerRate.belongsTo(db.user);
db.answerRate.belongsTo(db.answer);
db.user.hasMany(db.answerRate);
db.answer.hasMany(db.answerRate);

db.playlist.belongsTo(db.user);
db.user.hasMany(db.playlist);

db.video.belongsTo(db.playlist);
db.playlist.hasMany(db.video);

db.videoComment.belongsTo(db.video);
db.videoComment.belongsTo(db.user);
db.video.hasMany(db.videoComment);
db.user.hasMany(db.videoComment);



module.exports = db;
