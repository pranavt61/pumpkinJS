//TODOs:
//define mouse action

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

var tileClickAction = function()
	{

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