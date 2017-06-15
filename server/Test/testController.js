const testModel = require('./testModel.js');
const mongoose = require ('mongoose');
const request = require('request');
const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSem9S-AbCmHrhkT8NbwCDMVyFQRc_SiUY6a0pOaOJLpzGgL0g/formResponse';

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

	sendResponse: (req, res)=> {
    	let answers = req.body.answers;
    	// console.log(answers);
    	request.post(formUrl,
    	 {form:answers}, (err,httpRes,body) => {
    	 	let resObj = {added : false, err : null};
    	 	if(err){
    	 		resObj.err = err;
    	 		// console.log("err ===", err);
    	 	}
    	 	// console.log("status: ", httpRes.statusCode);
    	 	if(/(has been recorded)|(تم تسجيل)/.test(body)){
    	 		resObj.added = true;
    	 	}
    	 	res.json(resObj);

    	})
    },

}
