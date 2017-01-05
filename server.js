//Server

//dependencies
var express 	= require('express');
var path		= require('path');
var morgan 		= require('morgan');

var app = express();
var portList = 3000;

//app set up
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(morgan('dev'));

app.get('/', function (req, res){

	res.render('index');
});

app.listen(portList, function()
	{
		console.log('Listening on port: ' + portList);
	});