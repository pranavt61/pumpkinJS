//AI

var schemaSize = 8;
var schemaScale = 2;
var schemaFileName = './src/schema.json';

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

	//scale

	//replace 1 -> max scale
	for(var key in schemaInit)
		for(var i = 0; i < schemaSize; i ++)
			for(var j = 0; j < schemaSize; j ++)
				if(schemaInit[key][i][j] == 1)
					schemaInit[key][i][j] = schemaScale;


	//BORKEN
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

//exports
exports.teach = teach;
exports.schemaFileName = schemaFileName;