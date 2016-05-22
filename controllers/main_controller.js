var Ask = require('../models/ask');
var User= require('../models/user')
var mongoose = require('mongoose');

exports.getMain = function(req, res) {
  var completeData=[];
  var today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  Ask.find({'status':0,'time': { $gte: yesterday }},null,{sort:{likers: -1}}, function(err, askData){
    Ask.find({'status':2,'time': { $gte: yesterday }},null,{sort:{likers: -1}}, function(err, answerData){
        res.render('index', { title: 'Roop Homepage', user : req.user, tryemail : req.session.tryemail,askData:askData, completeData:answerData, trypassword:req.session.trypassword, message:req.flash('loginMessage') });
    });
  });

};
