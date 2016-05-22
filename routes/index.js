var User = require('../models/user');

var ask=require('../controllers/ask_controller.js');
var answer=require('../controllers/answer_controller.js');
var mypage = require('../controllers/mypage_controller.js');
var mainpage = require('../controllers/main_controller.js');
var express = require('express');
//var app = express.app();
var multer = require('multer');
var mkdirp = require('mkdirp');


var _storage = multer.diskStorage({
	destination: function (req, file, cb) {
		mkdirp('public/uploads/ask/'+req.session.passport.user+'/');
 		cb(null, 'public/uploads/ask/'+req.session.passport.user);
	},
	filename: function (req, file, cb) {
		cb(null, Date.now()+'@'+file.originalname);
	}
 })

var upload = multer({ storage: _storage });
//
// var multer_settings=multer({
//   dest:'./public/uploads/ask/'
// });



module.exports = function(app,passport){

	app.get('/', mainpage.getMain);

	app.get('/ask', ask.askpage);

	app.get('/askForm', function(req, res, next) {
		res.render('upload', { title: 'Ask Form Page', user : req.user  });
	});

	app.post('/askForm', upload.single('userfile'), ask.askenroll);

	app.get('/askUploaded', function(req, res, next) {
		res.render('askUploaded', { title: 'Ask Uploaded Page', user : req.user  });
	});


	app.post('/like',mypage.like);

	//app.get('/answer', function(req, res, next) {
	//	res.render('answer', { title: 'Answer Page', user : req.user });
	//});

	//app.get('/answerForm', function(req, res, next) {
	//	res.render('answerForm', { title: 'answer Form Page', user : req.user  });
	//});

	app.get('/answer', answer.answerPage);
	app.post('/answerForm', answer.getAskInfo);
	app.post('/answerForm/controller', answer.answerEnroll);
	app.post('/askInfo',ask.askinfo);
	app.post('/answerInfo',answer.answerinfo);
	app.post('/done',isLoggedIn,ask.askinfo);
	app.post('/wait',isLoggedIn,mypage.wait);
	app.post('/reject',isLoggedIn,mypage.reject);
	app.post('/success',isLoggedIn,mypage.success);

	app.get('/answerUploaded', function(req, res, next) {
		res.render('answerUploaded', { title: 'answer Uploaded Page', user : req.user  });
	});


	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	app.get('/upload', function(req, res, next) {
		res.render('upload',{user:req.user});
	});
	//avatar -> if we use upload.single('avatar'), req object have file property.
	app.post('/upload', upload.single('userfile'), ask.askenroll);
	/*
	app.get('/login', function(req, res, next) {
		res.render('login', { title: 'Login Page', message: req.flash('loginMessage') });
	});

	app.get('/signup', function(req, res){
		res.render('signup', { title: 'Signup Page', message: req.flash('signupMessage') });
	});
	*/
	/*
	app.get('/', function(req, res) {
		res.render('index.ejs', { message: req.flash('message') });
	});
	*/

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	//app.get('/profile', isLoggedIn, function(req, res) {
	//	res.render('profile', {
	//		user : req.user // get the user out of session and pass to template
	//	});
	//});

	app.get('/myPage',isLoggedIn, mypage.getMyData);
	app.post('/myPage',isLoggedIn, mypage.postMyData);
	app.post('/myPageAccept',isLoggedIn, mypage.myPageAccept);
	app.post('/myPageReject',isLoggedIn, mypage.myPageReject);

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


	//app.get('/myPage', isLoggedIn, function(req, res){
	//	res.render('myPage', { user: req.user });
	//});

	//app.get('/myPage', isLoggedIn, mypage.)

	app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email','user_location','user_birthday','user_photos'] }));

	// The OAuth provider has redirected the user back to the application.
	// Finish the authentication process by attempting to obtain an access
	// token.  If authorization was granted, the user will be logged in.
	// Otherwise, authentication has failed.
	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect: '/',
		failureRedirect: '/login'
	}));

	app.post('/signup/checkemail',function(req,res){

		console.log(req.body);
		User.findOne({ 'local.email' :  req.body.data }, function(err, user) {
			console.log(req.body);
			if (user) {
				console.log("here?");
				res.send(true);
			}
			else{
				res.send(false);

			}
		});
		//res.send({data:isexisted});
		//res.send({'result':"false"});

	});

};

function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
