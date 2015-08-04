var fs = require('fs');
var request = require('request');

module.exports = {
	pwd: function(stdin, _, done){
		done(process.env.PWD);
	},
	date: function(stdin, _, done) {
		done(Date());
	},

	ls: function(stdin, _, done) {
		fs.readdir('.', function(err, files) {
			if (err) throw err;
			done(files.map(function(file){return file.toString()}).join('\n'));
		});
	},

	echo: function(stdin, params, done) {
		params = params.split(' ');
		var output = [];
		params.forEach(function(arg) {
			var isEnv = /^\$([A-Z]+)$/.exec(arg);
			if (isEnv) output.push(process.env[isEnv[1]]);
			else output.push(arg);	
		});
		done(output.join('\n'));
	},

	cat: function(stdin, filenames, done) {
		filenames = filenames.split(' ');
		var texts = [];
		var count = 0;
		filenames.forEach(function(file, i) {
			fs.readFile(file, 'utf8', function(err,data){
				if(err) throw err;
				texts[i] = data;
				count++;
				if (count == filenames.length) done(texts.join('\n'));
			});
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
				done(lines.join('\n'));
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