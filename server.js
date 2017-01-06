var express = require('express');
var app = express();
var http = require('http').Server(app);

var ArticleProvider = require('./script/db/articleprovider').ArticleProvider;
var nconf = require('nconf');

var io = require('socket.io')(http);
var bodyParser = require('body-parser');


//Properties file
nconf.argv().env().file({ file:  './resources/conf.json' });

console.log(nconf.get('database').host);

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Routing
app.use(express.static(__dirname + '/views'));


// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({extended: false})


app.get('/', function (req, res) {
    res.render('formulaire');
});

app.post('/valider', urlencodedParser, function (req, res) {
    console.log("Ok", req.body)
    res.render('Result', {sayHelloTo: {'Username': req.body.Username, 'password': req.body.password}});
});


http.listen(8080, function () {
    console.log('listening on *:8080');
});


