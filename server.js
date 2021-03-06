//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();

//Database
var db = require('./db');

//Routes
var auth = require('./routes/auth')(app, express);
var main = require('./routes/main')(app, express);
var question = require('./routes/question')(app, express);
var video = require('./routes/video')(app, express);
var contact = require('./routes/contact')(app, express);

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use('/auth', auth);
app.use('/api', main);
app.use('/question', question);
app.use('/video', video);
app.use('/contact', contact);

db.sequelize.sync({
    force: false
}).then(function() {
    console.log('Database is connected succesfully..');
    app.listen(3000, function() {
        console.log('Server is listening at 3000!');
    });
});
