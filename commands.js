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
		var isEnv = /^\$([A-Z]+)$/.exec(param);
		if (isEnv)
			process.stdout.write(process.env[isEnv[1]]);
		else
			process.stdout.write(param);
		this.prompt();
	},

	cat: function(file) {
		var self = this;
		fs.readFile(file, 'utf8', function(err,data){
			if(err) throw err;
			process.stdout.write(data);
			self.prompt();
		});
	},

	head: function(file) {
		var self = this;
		fs.readFile(file, 'utf8', function(err,data){
			if(err) throw err;
			var lines = data.split('\n');
			var printOut = lines.slice(0,5).join('\n');
			process.stdout.write(printOut);
			self.prompt();
		});
	},

	tail: function(file) {
		var self = this;
		fs.readFile(file, 'utf8', function(err,data){
			if(err) throw err;
			var lines = data.split('\n');
			var printOut = lines.slice(lines.length-5).join('\n');
			process.stdout.write(printOut);
			self.prompt();
		});
	},

	sort: function(file) {
		var self = this;
		fs.readFile(file, 'utf8', function(err,data){
			if(err) throw err;
			var sortedLines = data.split('\n').map(function(e){return e.trim()}).filter(function(e){return !!e}).sort().join('\n');
			process.stdout.write(sortedLines);
			self.prompt();
		});
	},	

	wc: function(file) {
		var self = this;
		fs.readFile(file, 'utf8', function(err,data){
			if(err) throw err;
			var lines = data.split('\n');
			process.stdout.write((lines.length).toString());
			self.prompt();
		});
	},

	uniq: function(file) {
		var self = this;
		fs.readFile(file, 'utf8', function(err,data){
			if(err) throw err;
			var lines = data.split('\n').map(function(e){return e.trim()});
			for(var i = 0; i < lines.length-1; i++){
				if(lines[i]==lines[i+1]){
					lines = lines.slice(0,i+1).concat(lines.slice(i+2));
					i--;
				}
			}
			process.stdout.write(lines.join('\n'));
			self.prompt();
		});
	}
}