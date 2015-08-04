commands = require('./commands.js');

process.stdout.write('prompt > ');



process.stdin.on('data', function(data) {
	//var args = data.toString().trim().split(' ');
	var cmdString = data.toString().trim();
	var cmdList = cmdString.split(/\s*\|\s*/g)

	var args = cmdList[0].split(' ');
	var cmd = args[0];
	var param = args[1] ? args[1] : undefined;

	var done = function(output) {
		cmdList.shift();
		if (cmdList.length) {
			commands[cmdList[0]](output, undefined, done);
		}
		else {
			process.stdout.write(output);
			process.stdout.write('\nprompt > ');
		}
	}

	if (commands.hasOwnProperty(cmd.toLowerCase())) {
		commands[cmd](undefined, param, done);
	}
	else {
		console.error('command '+cmd+' not found');
		process.stdout.write('\nprompt > ');
	}
});

