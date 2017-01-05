//Starting point

//dependencies
var jsonfile = require('jsonfile');

//imports
var pumpkin = require('./pumpkin');

function main()
{
	jsonfile.writeFileSync(pumpkin.schemaFileName,pumpkin.teach(), {spaces: 2});
}

main();