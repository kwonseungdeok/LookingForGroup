const express = require('express');
const { poolPromise } = require('./router/dbconnect');
const app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs")

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.listen(41433, function () {
    console.log('listening on 31433')
})

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
 secret: '@#@$MYSIGN#@$#$',
 resave: false,
 saveUninitialized: true
}));

var router = require('./router/main')(app, fs, poolPromise);
