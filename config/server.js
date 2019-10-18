var express = require ('express');
var app = express();
var consign = require('consign');
var validator = require('express-validator');
var bodyParser = require('body-parser');
var session = require('express-session');

app.set('view engine', 'ejs');
app.set('views', './app/views');


app.use(bodyParser.urlencoded({extended:true}));
app.use(validator());
app.use(express.static('./app/public'));
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));

consign().include('app/routes').
then('app/models').
then('app/controllers').
then('config/connection.js').
into(app);

module.exports = app;