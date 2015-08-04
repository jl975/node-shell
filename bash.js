commands = require('./commands.js');

process.stdout.write('prompt > ');

process.stdin.on('data', function(data) {
	var args = data.toString().trim().split(' ');


	var cmd = args[0];
	var param = args[1] ? args[1] : undefined;

	if (commands.hasOwnProperty(cmd.toLowerCase())) {
		commands[cmd](param);

	

	}







});


