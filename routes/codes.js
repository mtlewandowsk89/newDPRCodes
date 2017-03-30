var express = require('express');
var codeRouter = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Codes = require('../models/code');

codeRouter.use(bodyParser.json());
codeRouter.route('/')
.get(function(req, res, next) {
	Codes.find({}, function (err, code) {
		if (err) throw err;
		res.json(code);
	});
})
.post(function(req, res, next) {
	Codes.create(req.body, function (err, code) {
		if (err) throw err;

		var id = code._id;
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});

		res.end('Added the code with id: ' + id);
	});
});

codeRouter.route('/:codeId')
.get(function(req, res, next) {
	Codes.findById(req.params.codeId, function (err, code) {
		if (err) throw err;
		res.json(code);
	});
})
.delete(function(req, res, next) {
	Codes.findByIdAndRemove(req.params.codeId, function (err, code) {
		if (err) throw err;
		res.json(code);
	});
});

module.exports = codeRouter;