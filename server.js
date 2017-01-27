//Server

//dependencies
var express 	= require('express');
var path		= require('path');
var morgan 		= require('morgan');
var bodyParser 	= require('body-parser');

//external files
var pumpkin = require('./src/pumpkin');

var app = express();
var portList = 3000;

//app set up
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public'));

//file retreiving
app.use(express.static('public'));

//body parser
app.use(bodyParser.json());      	 
app.use(bodyParser.urlencoded({    	 
  extended: true
})); 

//pumpkin
app.use(pumpkin.main);

app.get('/', function(req, res)
{
	res.render('ajaxTesting');
});

app.post('/', function(req, res)
	{
		console.log(req.body.data);
		res.send('DONE');
	});

app.listen(portList, function()
	{
		console.log('Listening on port: ' + portList);
	});