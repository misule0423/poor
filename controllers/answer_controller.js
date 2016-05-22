var configAuth = require('../config/auth');
var Ask = require('../models/ask');
var User= require('../models/user')
var mongoose = require('mongoose');
var multer = require('multer');

exports.getAskInfo = function(req, res) {

	//console.log(req.body.img)

	var askInfo = {};

	Ask.find({ "_id": req.body.toimg} ,function(err, askInfo){
		//console.log(askInfo);
		res.render('answerForm', { title: 'AnswerForm Page', user : req.user, askInfo : askInfo[0]});
	});

}

exports.answerEnroll = function(req, res) {

	var key = mongoose.Types.ObjectId(req.session.passport.user);

	//console.log(key);
    //console.log(req.body.brand_model);
	//console.log(req.body._id);

	var name;
	var email;

	User.findOne({ '_id' : key }, function(err, user) {

		if(user.local.name)
		name = user.local.name;
		else if(user.facebook.name)
		name = user.facebook.name;
		else if(user.naver.name)
		name = user.naver.name;
		else if(user.google.name)
		name = user.google.name;

		if(user.local.email)
		email = user.local.email;
		else if(user.facebook.email)
		email = user.facebook.email;
		else if(user.naver.email)
		email = user.naver.email;
		else if(user.google.email)
		email = user.google.email;


		Ask.findOne({ '_id' : req.body._id}, function(err, ask){
			//console.log(ask.answers);
			//console.log(req.body._id);
			//ask.name=req.body._id;
			//console.log(req.body.price);

			ask.status = 1;
			ask.answers.push({
				answer:req.session.passport.user,
				name:name,
				email:email,
				status:0,
				brand:req.body.brand,
				price:req.body.price,
				link:req.body.link,
				isDelivery:req.body.isDelivery,
				comment:req.body.extraInformation
			});
			// ask.answers = [{
			// 	answer:req.session.passport.user,
			// 	name:name,
			// 	email:email,
			// 	status:0,
			// 	brand:req.body.brand,
			// 	price:req.body.price,
			// 	link:req.body.link,
			// 	isDelivery:req.body.isDelivery,
			// 	comment:req.body.extraInformation
			// }];

			user.answers.push(req.body._id);
			user.save(function(err){
			if(err)
				console.log(err);
			});



			//ask.answers =req.body.point ;
			//ask.answers.clothes.brand = req.body.brand;

			ask.save(function(err){

			});
		});
	});

	res.redirect('/answerUploaded');

}

exports.answerPage = function(req, res) {

    var answerData={};
    var count=0;

	Ask.find({ 'status' : 2 },null,{sort:{time: -1}}, function(err, answerData) {

		res.render('answer', { title: 'Answer Page', user : req.user, answerData:answerData });

    });

}


exports.answerinfo=function(req,res){

  var id = mongoose.Types.ObjectId(req.body.id);
  Ask.findOne({'_id':id},function(err, answerdata) {
		answerdata.viewers=answerdata.viewers+1;
		answerdata.save(function(err){

		});
		console.log(answerdata);
    res.render('answerInfo', { title: 'Answer Info Page', user : req.user, statu:req.body.stat,answerdata:answerdata, activity:req.body.activity });

  });
};
