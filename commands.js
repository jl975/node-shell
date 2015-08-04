var fs = require('fs');
var request = require('request');

module.exports = {
	pwd: function(stdin, _, done){
		done(process.env.PWD);
	},
	date: function(stdin, _, done) {
		done(String(new Date()));
	},

	ls: function(stdin, _, done) {
		fs.readdir('.', function(err, files) {
			var output = '';
			if (err) throw err;
			files.forEach(function(file) {
				output += file.toString()+'\n';
				//process.stdout.write(file.toString() + '\n');
			})
			done(output);
		});
	},

	echo: function(stdin, param, done) {
		var output = '';
		var isEnv = /^\$([A-Z]+)$/.exec(param);
		if (isEnv) output = process.env[isEnv[1]]
		else output = param;
		done(output);
	},

	cat: function(stdin, file, done) {
		fs.readFile(file, 'utf8', function(err,data){
			if(err) throw err;
			// process.stdout.write(data);
			done(data);
		});
	},

	head: function(stdin, file, done) {
		if (file) {
			fs.readFile(file, 'utf8', function(err,data){
				if(err) throw err;
				var lines = data.split('\n');
				var printOut = lines.slice(0,5).join('\n');
				done(printOut);
			});
		}
		else if (stdin) {
			var lines = stdin.split('\n');
			var printOut = lines.slice(0,5).join('\n');
			done(printOut);
		}
	},

	tail: function(stdin, file, done) {
		if (file) {
			fs.readFile(file, 'utf8', function(err,data){
				if(err) throw err;
				var lines = data.split('\n');
				var printOut = lines.slice(lines.length-5).join('\n');
				done(printOut);
			});
		}
		else if (stdin) {
			var lines = stdin.split('\n');
			var printOut = lines.slice(lines.length-5).join('\n');
			done(printOut);
		}
	},

	sort: function(stdin, file, done) {
		if (file) {
			fs.readFile(file, 'utf8', function(err,data){
				if(err) throw err;
				var sortedLines = data.split('\n').map(function(e){return e.trim()}).filter(function(e){return !!e}).sort().join('\n');
				done(sortedLines);
			});
		}
		else if (stdin) {
			var sortedLines = stdin.split('\n').map(function(e){return e.trim()}).filter(function(e){return !!e}).sort().join('\n');
			done(sortedLines);
		}
	},	

	wc: function(stdin, file, done) {
		if (file) {
			fs.readFile(file, 'utf8', function(err,data){
				if(err) throw err;
				var lines = data.split('\n');
				var output = String(lines.length);
				done(output);
			});
		}
		else if (stdin) {
			var lines = stdin.split('\n');
			var output = String(lines.length);
			done(output);
		}
	},

	uniq: function(stdin, file, done) {
		if (file) {
			fs.readFile(file, 'utf8', function(err,data){
				if(err) throw err;
				var lines = data.split('\n').map(function(e){return e.trim()});
				for(var i = 0; i < lines.length-1; i++){
					if(lines[i]==lines[i+1]){
						lines = lines.slice(0,i+1).concat(lines.slice(i+2));
						i--;
					}
				}
				var output = lines.join('\n');
				done(output);
			});
		}
		else if (stdin) {
			var lines = stdin.split('\n').map(function(e){return e.trim()});
			for(var i = 0; i < lines.length-1; i++){
				if(lines[i]==lines[i+1]){
					lines = lines.slice(0,i+1).concat(lines.slice(i+2));
					i--;
				}
			}
			var output = lines.join('\n');
			done(output);
		}
	},

	curl: function(stdin, url, done) {
		request(url, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		  	done(body);
		  }
		});
	},






}