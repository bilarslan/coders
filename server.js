//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();

//Database
var db = require('./db');

//Routes
var auth = require('./routes/auth')(app, express);

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/auth', auth);

app.get('*', function(req, res) {
    res.send('Hello world!');
});

db.sequelize.sync({
    force: true
}).then(function() {
    console.log('Database is connected succesfully..');
    app.listen(3000, function() {
        console.log('Server is listening at 3000!');
    });
});
