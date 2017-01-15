module.exports = {
	uuid: false,
	server: "http://192.168.1.155:7000",
	buildCodeUrl: function(uuid, socketid) {
		return this.server + "/api/qrlogin/" + uuid + "/" + socketid;
	}
}
