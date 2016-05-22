var configAuth = require('../config/auth');
var Ask = require('../models/ask');
var User= require('../models/user')
var mongoose = require('mongoose');

exports.getMyData = function(req, res) {

	var myData = {};
	var key = mongoose.Types.ObjectId(req.session.passport.user);
  	//var status = 0;

	User.findOne({ "_id": key } ,function(err, myData){

		Ask.find({"_id" :{$in:myData.asks}},null,{sort:{time: -1}}, function(err, myDataAsk){
			Ask.find({"_id" :{$in:myData.answers}},null,{sort:{time: -1}}, function(err, myDataAnswer){
				Ask.find({"_id" :{$in:myData.likes}},null,{sort:{time: -1}}, function(err, myDataLike){
					res.render('myPage', { title: 'myPage',user:req.user, myData : myData,myDataLike:myDataLike, myDataAsk:myDataAsk, myDataAnswer:myDataAnswer,activity:"1" });
				});
			});
		});
	});
};
exports.like=function(req,res){
	var liker = mongoose.Types.ObjectId(req.body.liker);
	var key = mongoose.Types.ObjectId(req.session.passport.user);
	var iskey=false;
	User.findOne({ "_id": key } ,function(err, myData){
		for(var i=0; i<myData.likes.length; i++){
			if(myData.likes[i].toString()==liker.toString()){
				myData.likes.splice(i,1);
				console.log("bye~");
				iskey=true;
				break;
			}
		}

		if(!iskey){
			myData.likes.push(liker);
			myData.save(function(err){

			});

			Ask.findOne({"_id" :liker}, function(err, myDataAsk){
				myDataAsk.likers=myDataAsk.likers+1;
				myDataAsk.save(function(err){
					res.send({result:true,likes:myDataAsk.likers });
				});
			});
		}

		else{
			myData.save(function(err){

			});
			Ask.findOne({"_id" :liker}, function(err, myDataAsk){
				myDataAsk.likers=myDataAsk.likers-1;
				myDataAsk.save(function(err){
					res.send({result:false,likes:myDataAsk.likers});
				});
			});

		}
	});
};

exports.postMyData=function(req,res){
	var myData = {};
	var key = mongoose.Types.ObjectId(req.session.passport.user);
		//var status = 0;

	User.findOne({ "_id": key } ,function(err, myData){

		Ask.find({"_id" :{$in:myData.asks}},null,{sort:{time: -1}}, function(err, myDataAsk){
			Ask.find({"_id" :{$in:myData.answers}},null,{sort:{time: -1}}, function(err, myDataAnswer){
					Ask.find({"_id" :{$in:myData.likes}},null,{sort:{time: -1}}, function(err, myDataLike){
						res.render('myPage', { title: 'myPage',user:req.user, myDataLike:myDataLike,myData : myData, myDataAsk:myDataAsk, myDataAnswer:myDataAnswer,activity:req.body.activity });
					});
			});
		});
	});

};


exports.myPageAccept = function(req,res){
	//console.log(req.body.toimg);
	var myData = {};
	var key = mongoose.Types.ObjectId(req.session.passport.user);

	User.findOne({ "_id": key } ,function(err, myData){

		Ask.find({"_id" :{$in:myData.asks}},null,{sort:{time: -1}}, function(err, myDataAsk){

			Ask.find({"_id" :{$in:myData.answers}},null,{sort:{time: -1}}, function(err, myDataAnswer){
				Ask.find({"_id" :{$in:myData.likes}},null,{sort:{time: -1}}, function(err, myDataLike){
				//res.render('myPage', { title: 'myPage',user:req.user, myData : myData, myDataAsk:myDataAsk, myDataAnswer:myDataAnswer, status: status });
				Ask.findOne({"_id" : req.body.toimg }, function(err, ask){
					console.log(ask);
					for(var i=0; i<ask.answers.length; i++){
						if(ask.answers[i].status==0){
							ask.answers[i].status=2;
							break;
						}
					}
					ask.status = 2;

					ask.save(function(err){

					});
				});

				res.render('myPage', { title: 'myPage',user:req.user, myDataLike:myDataLike,myData : myData, myDataAsk:myDataAsk, myDataAnswer:myDataAnswer,activity:req.body.activity});
			});
		});
		});
	});
};


exports.wait = function(req,res){
	var id = mongoose.Types.ObjectId(req.body.id);
	Ask.findOne({'_id':id},function(err, askdata) {
		askdata.viewers=askdata.viewers+1;
    askdata.save(function(err){

    });

		res.render('done', { title: 'Ask Page', statu:req.body.stat,user : req.user, askdata:askdata,activity:req.body.activity });

	});
};

exports.success = function(req,res){
	var id = mongoose.Types.ObjectId(req.body.id);
	Ask.findOne({'_id':id},function(err, askdata) {
		askdata.viewers=askdata.viewers+1;
    askdata.save(function(err){

    });

		res.render('done', { title: 'Ask Page', statu:req.body.stat,user : req.user, askdata:askdata,activity:req.body.activity });

	});

};

exports.reject = function(req,res){
	var id = mongoose.Types.ObjectId(req.body.id);
	Ask.findOne({'_id':id},function(err, askdata) {
		askdata.viewers=askdata.viewers+1;
    askdata.save(function(err){

    });

		res.render('done', { title: 'Ask Page', statu:req.body.stat,user : req.user, askdata:askdata,activity:req.body.activity });

	});
};

exports.myPageReject = function(req,res){
	//console.log(req.body.toimg);
	var myData = {};
	var key = mongoose.Types.ObjectId(req.session.passport.user);

	User.findOne({ "_id": key } ,function(err, myData){

		Ask.find({"_id" :{$in:myData.asks}},null,{sort:{time: -1}}, function(err, myDataAsk){

			Ask.find({"_id" :{$in:myData.answers}},null,{sort:{time: -1}}, function(err, myDataAnswer){
				Ask.find({"_id" :{$in:myData.likes}},null,{sort:{time: -1}}, function(err, myDataLike){
				//res.render('myPage', { title: 'myPage',user:req.user, myData : myData, myDataAsk:myDataAsk, myDataAnswer:myDataAnswer, status: status });
				Ask.findOne({"_id" : req.body.toimg }, function(err, ask){
					//console.log(ask.status);
					for(var i=0; i<ask.answers.length; i++){
						if(ask.answers[i].status==0){
							ask.answers[i].status=1;
							break;
						}
					}
					ask.status = 0;

					ask.save(function(err){

					});
				});

				res.render('myPage', { title: 'myPage',user:req.user, myDataLike:myDataLike,myData : myData, myDataAsk:myDataAsk, myDataAnswer:myDataAnswer,activity:req.body.activity });
			});
		});
		});
	});
};
