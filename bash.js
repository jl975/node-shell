commands = require('./commands.js');

process.stdout.write('prompt > ');

process.stdin.on('data', function(data) {
	var cmdString = data.toString().trim();
	var cmdList = cmdString.split(/\s*\|\s*/g);

	var args = cmdList[0].trim().split(' ');
	var cmd = args[0];
	var params = args[1] ? args.slice(1).join(' ') : undefined;

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
		commands[cmd](undefined, params, done);
	}
	else {
		console.error('command '+cmd+' not found');
		process.stdout.write('\nprompt > ');
	}
});

