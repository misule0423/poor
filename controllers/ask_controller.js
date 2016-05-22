var configAuth = require('../config/auth');
var Ask = require('../models/ask');
var User= require('../models/user')
var mongoose = require('mongoose');
var multer = require('multer');

exports.askpage = function(req,res){
    var askdata={};
    var count=0;
    Ask.find({'status':0},null,{sort:{time: -1}}, function(err, askdata) {
      res.render('ask', { title: 'Ask Page', user : req.user, askdata:askdata });


    });


};


exports.askinfo=function(req,res){

  var id = mongoose.Types.ObjectId(req.body.id);
  Ask.findOne({'_id':id},function(err, askdata) {
    askdata.viewers=askdata.viewers+1;
    askdata.save(function(err){
    });
    console.log(req.session);
    console.log(askdata);
    res.render('askInfo', { title: 'Ask Page', statu:req.body.stat,user : req.user, askdata:askdata, activity:req.body.activity });

  });
};

exports.done=function(req,res){

  var id = mongoose.Types.ObjectId(req.body.id);
  Ask.findOne({'_id':id},function(err, askdata) {
    askdata.viewers=askdata.viewers+1;
    askdata.save(function(err){

    });

    res.render('done', { title: 'Ask Page', statu:req.body.stat,user : req.user, askdata:askdata,activity:req.body.activity });

  });
};







exports.askenroll = function(req,res){
  var key = mongoose.Types.ObjectId(req.session.passport.user);
    console.log(req.file);
    console.log(req.body);
    console.log(req.params);
    var newAsk            = new Ask();

    User.findOne({ '_id' : key }, function(err, user) {

      var name;
      var email;

      if(user.local.name)
        name=user.local.name;
      else if(user.facebook.name)
        name=user.facebook.name;
      else if(user.naver.name)
        name=user.naver.name;
      else if(user.google.name)
        name=user.google.name;

      if(user.local.email)
        email=user.local.email;
      else if(user.facebook.email)
        name=user.facebook.email;
      else if(user.naver.email)
        name=user.naver.email;
      else if(user.google.email)
        name=user.google.email;

      user.asks.push(newAsk._id);
      user.save(function(err){
        if(err)
          console.log(err);
      });
      newAsk.asker=key;
      newAsk.name =name ;
      newAsk.email =email;
      newAsk.status =0 ;
      newAsk.ask_img_dir = req.file.destination.substring(19)+'/'+req.file.filename;

      var comment=req.body.explantion;
      comment=comment.replace(/(\s+)/gi,' ').trim();
      newAsk.comment = comment;

      var tags=req.body.hashtag;
      tags=tags.replace(/(\s+)/gi,' ');
      tags=tags.replace(/(\#+)/gi,' #').trim();
      var tagsarray=tags.split(' ');
      for(var i=0; i<tagsarray.length; i++){
        if(tagsarray[i][0]!='#')
          tagsarray[i]='#'+tagsarray[i];
      }
      newAsk.tag = tagsarray;
      newAsk.reward =req.body.point ;
      newAsk.view = 0 ;
      newAsk.time= Date.now();
      newAsk.gender=req.body.sex;
      console.log("here");

      newAsk.clothes.size = req.body.size;
      newAsk.clothes.color = req.body.color;

      newAsk.save(function(err){
        if (err)
          throw err;
      });
    });


    User.findOneAndUpdate({ '_id' : key }, { 'asks': newAsk._id });



    res.redirect('/askUploaded');


};
