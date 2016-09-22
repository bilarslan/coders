//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();

var mid = {
    reqAuth: function(req, res, next) {
        console.log('Hey!');
        next();
    }
}

//Database
var db = require('./db');

//Routes
var auth = require('./routes/auth')(app, express);
var main = require('./routes/main')(app, express);

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/api', main);

db.sequelize.sync({
    force: true
}).then(function() {
    console.log('Database is connected succesfully..');
    app.listen(3000, function() {
        console.log('Server is listening at 3000!');
    });
});
