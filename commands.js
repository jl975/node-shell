var fs = require('fs');

module.exports = {
	pwd: function(){
		process.stdout.write(process.env.PWD);
		this.prompt();
	},
	date: function() {
		process.stdout.write(String(new Date()));
		this.prompt();
	},
	prompt: function() {
		process.stdout.write('\nprompt > ');
	},

	ls: function() {
		var self = this;
		fs.readdir('.', function(err, files) {
			if (err) throw err;
			files.forEach(function(file) {
				process.stdout.write(file.toString() + '\n');
			})
			self.prompt();
		});
	},

	echo: function(param) {
		process.stdout.write(param);
		this.prompt();
	},
}