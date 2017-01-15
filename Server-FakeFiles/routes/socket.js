var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(5001);

io.on('connection', function(socket) {
	socket.emit('qr', {
		connect: 'wait'
	});
	socket.on('connect', function(data) {
		console.log("connect:");
		console.log(data);
	});
});
