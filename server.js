//Server

//dependencies
var express 	= require('express');
var path		= require('path');
var morgan 		= require('morgan');

var app = express();
var portList = 3000;

//app set up
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public'));

app.use(express.static('public'));

app.get('/', function(req, res)
{
	res.render('ajaxTesting');
});

app.listen(portList, function()
	{
		console.log('Listening on port: ' + portList);
	});