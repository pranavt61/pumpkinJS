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

var tileClickAction = function()
	{
		console.log('Aye');
	};

//tile class
var Tile = function()
{
	//construct tile
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
		this.currentState = state;
		this.imageView.src = images[this.currentState.toString()];
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