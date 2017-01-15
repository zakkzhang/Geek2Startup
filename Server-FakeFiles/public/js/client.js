$(document).ready(function() {
	var socket = io.connect('http://localhost:5001');
	socket.on('qr', function(data) {
		console.log(data);
		var id = $("#session").text();

		socket.emit('connect', {
			"session": id
		});
		console.log(id);
	});
});
