//Starting point

//dependencies
var jsonfile = require('jsonfile');

//imports
var pumpkin = require('./pumpkin');

function main()
{
	teachPumpkin();
}

//loads json object to schemas, TESTING
function teachPumpkin()
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
		for(var i = 0; i < pumpkin.schemaSize; i ++)
			for(var j = 0; j < pumpkin.schemaSize; j ++)
				if(schemaInit[key][i][j] == 1)
					schemaInit[key][i][j] = pumpkin.schemaScale;


	//BORKEN
	//find distance
	for(var key in schemaInit)
	{
		if(schemaInit.hasOwnProperty(key))
		{
			for(var i = 0; i < pumpkin.schemaSize; i ++)
			{
				for(var j = 0; j < pumpkin.schemaSize; j ++)
				{

					//if max scale, dont replace with distance
					if(schemaInit[key][i][j] != pumpkin.schemaScale)
					{
						var horzDist = 0,vertDist = 0;

						//horiz dist
						for(var h = 0; h < pumpkin.schemaScale; h ++)
						{
							if((schemaInit[key][i][j + h] == pumpkin.schemaScale)
								|| (schemaInit[key][i][j - h] == pumpkin.schemaScale))
							{
								//found max horizontal dist
								horzDist = pumpkin.schemaScale - h;
								break;
							}	
						}

						//vert dist
						for(var v = 0; v < pumpkin.schemaScale; v ++)
						{
							//check if undefined
							if(schemaInit[key][i + v] != undefined)
								if(schemaInit[key][i + v][j] == pumpkin.schemaScale)
								{
									vertDist = pumpkin.schemaScale - v;
									break;
								}
							

							//check if undefined
							if(schemaInit[key][i - v] != undefined)
								if(schemaInit[key][i - v][j] == pumpkin.schemaScale)
								{
									//found max vertical dist
									vertDist = pumpkin.schemaScale - v;
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

	jsonfile.writeFileSync(pumpkin.schemaFileName, schemaInit, {spaces: 2});
}

main();