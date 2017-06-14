const testModel = require('./testModel.js');
const mongoose = require ('mongoose');


module.exports = {
	addAnswers:(req, res)=>{
		let answers  = req.body.answers;
		testModel.findOneAndUpdate({userId : '1'}, { answers : answers}, (err, data)=> {
			if (err) {
				res.status(500).send(err);
			}else{
				res.json(data);
			}
		});

	},
	getAnswers:(req, res)=>{
		// let test  = req.body.test;
		testModel.findOne({ userId : '1'}, (err, data)=> {
			if (err) {
				res.status(500).send(err);
			}else{
				res.json(data);
			}
		});

	},

}
