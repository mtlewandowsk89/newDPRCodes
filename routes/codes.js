var express = require('express');
var codeRouter = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var Verify = require('./verify');
var Codes = require('../models/code');

codeRouter.use(bodyParser.json());
codeRouter.route('/')
.get(function(req, res, next) {
	Codes.find({}, function (err, code) {
		if (err) next(err);
		res.json(code);
	});
})
.post(function(req, res, next) {
	Codes.create(req.body, function (err, code) {
		if (err) next(err);

		// req.body.postedBy = req.decoded._id;

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
		if (err) next(err);
		res.json(code);
	});
})
.delete(function(req, res, next) {
	Codes.findByIdAndRemove(req.params.codeId, function (err, code) {
		// if (code.id(req.params.codeId).postedBy != req.decoded._id) {
		// 	var err = new Error('You are not authorized to delete this code!');
		// 	err.status = 403;
		// 	return next(err);
		// }
		if (err) next(err);
		res.json(code);
	});
});

module.exports = codeRouter;