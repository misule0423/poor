//
// var login = require('./login');
// var login_facebook = require('./login_facebook')
// var signup = require('./signup');
// var User = require('../models/user');
//
// module.exports = function(passport){
//     passport.serializeUser(function(user, done) {
//         done(null, user.id);
//     });
//
//         //console.log('haha');
//
//     passport.deserializeUser(function(id, done) {
//         User.findById(id, function(err, user) {
//             done(err, user);
//         });
//     });
//
//
//     login.local(passport);
//     login.facebook(passport);
//     signup(passport);
// }
