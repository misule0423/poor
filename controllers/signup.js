// var LocalStrategy   = require('passport-local').Strategy;
// var User = require('../models/user');
// var bCrypt = require('bcrypt-nodejs');
//
//
// module.exports = function(passport){
// 
//
//     passport.use('local-signup', new LocalStrategy({
//             // by default, local strategy uses username and password, we will override with email
//             usernameField : 'email',
//             passwordField : 'password',
//             firstNameField : 'firstName',
//             lastNameField : 'lastName',
//             yearField : 'year',
//             monthField : 'month',
//             dayField : 'day',
//             nameField : 'name',
//             passReqToCallback : true // allows us to pass back the entire request to the callback
//         },
//         function(req, email, password, firstName, lastName, year, month, day, done) {
//
//             process.nextTick(function() {
//
//             User.findOne({ 'local.email' :  email }, function(err, user) {
//                 // if there are any errors, return the error
//                 if (err)
//                     return done(err);
//
//                 // check to see if theres already a user with that email
//                 if (user) {
//                     return done(null, false, false, false, false, false, false, req.flash('signupMessage', 'That email is already taken.'));
//                 } else {
//
//                     // if there is no user with that email
//                     // create the user
//                     var newUser            = new User();
//                     // set the user's local credentials
//                     //newUser.id=1;
//                     newUser.local.email     = email;
//                     newUser.local.password  = newUser.generateHash(password);
//                     //newUser.local.firstName      = firstName;
//                     //newUser.local.lastName      = lastName;
//                     //newUser.local.year      = year;
//                     //newUser.local.month      = month;
//                     //newUser.local.day      = day;
//
//                     newUser.local.name      = lastName+firstName;
//                     newUser.time            = year+" "+month+" "+day;
//                     // save the user
//                     newUser.save(function(err) {
//                         if (err)
//                             throw err;
//                         return done(null, newUser);
//                     });
//                 }
//
//             });
//
//             });
//
//         }));
//
// }
