/* models.js */
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var resify = require("express-restify-mongoose")
var jwt = require('express-jwt')

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/test");

var Customer = mongoose.model('Customer', new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	comment: {
		type: String
	}
}));

// resify.serve(router, Customer, {
// 	preMiddleware: AllCanGetIt
// })

resify.serve(router, Customer);

module.exports = router;
