$(document).ready(function() {
	var socket = io.connect('http://localhost:5000');
	socket.on('hello', function(data) {
		console.log(data);
	});
	if (document.getElementById("login")) {
		console.log("isLogin");
		var session = $("#session").text();
		var socket = io.connect('http://localhost:5000');
		socket.on('qr', function(data) {
			console.log(data);

			socket.emit('onConnect', {
				"session": session
			});

			socket.emit('login', {
				"name": session
			});
			console.log(session);
		});
	}

});
