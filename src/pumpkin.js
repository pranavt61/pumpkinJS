//AI

var schemaSize = 8;							//size of schema
var schemaScale = 2;						//degree of error accepted
var schemaFileName = './src/schema.json';	//location of stored data
var schemaSet;								

//returns object
var teach = function()
{
	// set 0 or 1, turned into 0 - {schemaScale}
	var schemaInit = {
		'0':
		[
			[0,0,1,1,1,1,0,0],
			[0,1,1,0,0,1,1,0],
			[0,1,0,0,0,0,1,0],
			[0,1,0,0,0,0,1,0],
			[0,1,0,0,0,0,1,0],
			[0,1,0,0,0,0,1,0],
			[0,1,1,0,0,1,1,0],
			[0,0,1,1,1,1,0,0]
		],
		'1':
		[
			[0,0,0,1,1,0,0,0],
			[0,0,0,1,1,0,0,0],
			[0,0,0,1,1,0,0,0],
			[0,0,0,1,1,0,0,0],
			[0,0,0,1,1,0,0,0],
			[0,0,0,1,1,0,0,0],
			[0,0,0,1,1,0,0,0],
			[0,0,0,1,1,0,0,0]
		],
		'2':
		[
			[0,1,1,1,1,1,0,0],
			[0,1,0,0,0,1,0,0],
			[0,1,0,0,0,1,0,0],
			[0,0,0,0,1,1,0,0],
			[0,0,0,1,0,0,0,0],
			[0,0,1,0,0,0,0,0],
			[0,1,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1]
		],
		'3':
		[
			[0,0,1,1,1,1,0,0],
			[0,0,0,0,0,1,0,0],
			[0,0,0,0,0,1,0,0],
			[0,0,1,1,1,1,0,0],
			[0,0,1,1,1,1,0,0],
			[0,0,0,0,0,1,0,0],
			[0,0,0,0,0,1,0,0],
			[0,0,1,1,1,1,0,0]
		],
		'4':
		[
			[1,1,0,1,1,1,0,0],
			[1,1,1,0,1,1,0,0],
			[1,1,0,0,1,1,0,0],
			[1,1,1,1,1,1,1,0],
			[1,1,1,1,1,1,1,1],
			[0,0,0,0,1,1,0,0],
			[0,0,0,0,1,1,0,0],
			[0,0,0,0,1,1,0,0]
		],
		'5':
		[
			[1,1,1,1,1,1,1,1],
			[0,0,1,1,1,1,0,0],
			[0,0,1,0,0,0,0,0],
			[0,0,1,0,0,0,0,0],
			[0,0,1,1,1,1,0,0],
			[0,0,0,0,0,1,0,0],
			[0,0,0,0,0,1,0,0],
			[1,1,1,1,1,1,1,1]
		],
		'6':
		[
			[0,0,0,0,1,1,0,0],
			[0,0,0,1,1,0,0,0],
			[0,0,1,1,0,0,0,0],
			[0,1,1,0,0,0,0,0],
			[0,1,1,1,1,1,0,0],
			[0,1,1,0,0,1,1,0],
			[0,1,1,0,0,1,1,0],
			[0,0,1,1,1,1,0,0]
		],
		'7':
		[
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,1,1],
			[0,0,0,0,0,1,1,0],
			[0,0,0,0,1,1,0,0],
			[0,0,0,1,1,0,0,0],
			[0,0,1,1,0,0,0,0],
			[0,1,1,0,0,0,0,0]
		],
		'8':
		[
			[0,0,1,1,1,1,0,0],
			[0,1,0,0,0,0,1,0],
			[0,1,0,0,0,0,1,0],
			[0,0,1,1,1,1,0,0],
			[0,0,1,1,1,1,0,0],
			[0,1,0,0,0,0,1,0],
			[0,1,0,0,0,0,1,0],
			[0,0,1,1,1,1,0,0]
		],
		'9':
		[
			[0,0,1,1,1,1,0,0],
			[0,1,1,0,0,1,1,0],
			[0,1,1,0,0,1,1,0],
			[0,0,1,1,1,1,1,0],
			[0,0,0,0,1,1,0,0],
			[0,0,0,1,1,0,0,0],
			[0,0,1,1,0,0,0,0],
			[0,1,1,0,0,0,0,0]
		]
	};

	//replace 1 -> max scale
	for(var key in schemaInit)
		for(var i = 0; i < schemaSize; i ++)
			for(var j = 0; j < schemaSize; j ++)
				if(schemaInit[key][i][j] == 1)
					schemaInit[key][i][j] = schemaScale;


	//find distance
	for(var key in schemaInit)
	{
		if(schemaInit.hasOwnProperty(key))
		{
			for(var i = 0; i < schemaSize; i ++)
			{
				for(var j = 0; j < schemaSize; j ++)
				{

					//if max scale, dont replace with distance
					if(schemaInit[key][i][j] != schemaScale)
					{
						var horzDist = 0,vertDist = 0;

						//horiz dist
						for(var h = 0; h < schemaScale; h ++)
						{
							if((schemaInit[key][i][j + h] == schemaScale)
								|| (schemaInit[key][i][j - h] == schemaScale))
							{
								//found max horizontal dist
								horzDist = schemaScale - h;
								break;
							}	
						}

						//vert dist
						for(var v = 0; v < schemaScale; v ++)
						{
							//check if undefined
							if(schemaInit[key][i + v] != undefined)
								if(schemaInit[key][i + v][j] == schemaScale)
								{
									vertDist = schemaScale - v;
									break;
								}
							

							//check if undefined
							if(schemaInit[key][i - v] != undefined)
								if(schemaInit[key][i - v][j] == schemaScale)
								{
									//found max vertical dist
									vertDist = schemaScale - v;
									break;
								}
						}

						//get max
						schemaInit[key][i][j] = horzDist;//Math.max(horzDist, vertDist);
					}
				}
			}
		}
	}

	return schemaInit;
}

//inputs: 	2-D array of false, true, must be size of schema size
//			schema set
//output: object, char and distance -or- error
//note: the higher the number, the stronger the similarities
var compare = function(testPattern, schemaSet)
{
	//error checking 
	if(typeof testPattern != 'object')
		return {error: 'Test pattern not and object'};
	if(testPattern.length != schemaSize)
		return {error: 'Test pattern: invalid size'};
	for(var i = 0; i < schemaSize)
		if(testPattern[i].length != schemaSize)
			return {error: 'Test pattern: invalid size'};

	var validSchem = {
		character: '',
		score: 0
	};

	for(key in schemaSize)
	{
		var score = 0;
		//TODO Calc score
		for(var i = 0; i < schemaSize; i ++)
		{
			for(var j = 0; j < schemaSize; j ++)
			{
				if(testPattern[i][j] === true)
					score += schemaSet[key][i][j];
			}
		}

		if(validSchem.score < score)
		{
			validSchem.score = score;
			validSchem.character = key;
		}
	}

	return validSchem;
}

//exports
exports.teach = teach;
exports.schemaFileName = schemaFileName;