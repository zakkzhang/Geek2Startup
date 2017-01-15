module.exports = {
	uuid: false,
	server: "http://192.168.1.155:7000",
	buildCodeUrl: function(uuid) {
		return this.server + "/api/qrlogin/" + uuid;
	}
}
