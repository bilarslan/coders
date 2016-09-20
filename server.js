var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));

app.get('/', function(req, res){
    res.send('Hello world!');
});

app.listen(3000, function(){
  console.log('Server is listening at 3000!');
});
