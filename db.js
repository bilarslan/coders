var Sequelize = require('sequelize');
var sequelize = new Sequelize('coders', 'root', '123456', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

var db = {};

db.user = sequelize.import(__dirname + '/models/user.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
