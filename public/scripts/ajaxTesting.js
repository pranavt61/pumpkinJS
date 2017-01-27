//TODOs:
//Ajax call

var tileMapSize = 8;
var imageSize = 64;
var numTiles = 0;
var canvas;
var tilemap = [];

var images = {
	'false':'negative.png',
	'true':'positive.png'
};

var mouse = {
	curState: false,
	down: false
};

//tile class
var Tile = function()
{
	//construct tile
	var self = this;	// used in functions to refer to this obj
	this.id = numTiles++;
	this.imageView = document.createElement('img');
	this.currentState = false; // F = neg, T = pos

	//setup image view
	this.imageView.src = images['false'];
	this.imageView.width = this.imageView.height = imageSize;
	this.imageView.draggable = false;

	//add to canvas
	if(canvas)
		canvas.appendChild(this.imageView);

	//fucntions
	this.setState = function(state)
	{
		self.currentState = state;
		self.imageView.src = images[self.currentState.toString()];
	};

	//must come after setState decleration
	this.imageView.onmouseover = function()
	{
		if(mouse.down)
		{
			self.setState(mouse.curState);
		}
	};
	this.imageView.onmousedown = function()
	{
		mouse.down = true;
		mouse.curState = !self.currentState;
		self.setState(mouse.curState);
	};
	this.imageView.onmouseup = function()
	{
		mouse.down = false;
	};
}

function load()
{
	canvas = document.getElementById('canvas');

	for(var i = 0; i < tileMapSize; i ++)
	{
		for(var j = 0; j < tileMapSize; j ++)
		{
			tilemap.push(new Tile());
		}
		newImage = document.createElement('br');
		canvas.appendChild(newImage);
	}
}

function sendReq()
{
	//collect data
	var data = '';
	var dataLength = tileMapSize;

	var c = tileMapSize * tileMapSize;
	for(var i = 0; i < c; i ++)
		data += tilemap[i].currentState ? '1':'0';

	//send data
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
			console.log(this.responseText);
	};
	req.open('POST', '/pumpkin', true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.send("length="+ dataLength+"&data=" + data);
}