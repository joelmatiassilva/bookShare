//modules
var express = require('express');
var bodyParser = require('body-parser');
var bluebird = require('bluebird');
var path = require('path');
var morgan = require('morgan');
var session = require('express-session');
var passport = require('passport');

//config
var router = require('./config/routes');
var facebookSetup = require('./config/facebook');

//db
var models = require("./models");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({secret: 'unicorn', resave: true, saveUninitialized: true}));

app.use(morgan('dev'));

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/build/index.html'));
});

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/../client/build'));

facebookSetup(app);

router(app, express);

models.sequelize.sync().then(function () {
  var server = app.listen(process.env.PORT || 5000, function() {
    console.log('Express server listening on port ' + server.address().port);
  });
})
.catch(function(err) {
  console.log(err);
});

// User.create({name: "Bob", email: "bob@123.com", passwordHash: "falafel"});