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

module.exports = db;
