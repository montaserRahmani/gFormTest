const mongoose = require ('mongoose');

const TestSchema = new mongoose.Schema({
	answers : {
		type : String,
	},
	userId : {
		type : String
	}

})

const Test = mongoose.model('Test', TestSchema);
module.exports = Test;
