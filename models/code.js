var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var codeSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

var Codes = mongoose.model('Code', codeSchema);

module.exports = Codes;