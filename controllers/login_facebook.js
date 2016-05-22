// /*
// var FacebookStrategy = require('passport-facebook').Strategy;
// var mysql = require('mysql');
//
// var client = mysql.createConnection({
//
//     user: 'root',
//     password: '0',
//     database: 'RoopSecondDemoDB'
//
// });
//
// client.query('USE RoopSecondDemoDB');
//
// var configAuth = require('../config/auth');
//
// var bCrypt = require('bcrypt-nodejs');
// */
// var FacebookStrategy = require('passport-facebook').Strategy;
//
// // load up the user model
// var User       = require('../models/user');
//
// // load the auth variables
// var configAuth = require('../config/auth');
//
// module.exports = function(passport){
//      passport.use(new FacebookStrategy({
//
//         // pull in our app id and secret from our auth.js file
//         clientID        : configAuth.facebookAuth.clientID,
//         clientSecret    : configAuth.facebookAuth.clientSecret,
//         callbackURL     : configAuth.facebookAuth.callbackURL,
//         profileFields   : ["emails", "displayName", "name"]
//
//     },
//
//     // facebook will send back the token and profile
//     function(token, refreshToken, profile, done) {
//         console.log(profile);
//         // asynchronous
//         process.nextTick(function() {
//
//             // find the user in the database based on their facebook id
//
//             User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
//                 //    console.log(user);
//                 // if there is an error, stop everything and return that
//                 // ie an error connecting to the database
//                 if (err)
//                     return done(err);
//
//                 // if the user is found, then log them in
//                 if (user) {
//                     return done(null, user); // user found, return that user
//                 } else {
//                     // if there is no user found with that facebook id, create them
//                     var newUser            = new User();
//
//                     // set all of the facebook information in our user model
//                     newUser.facebook.id    = profile.id; // set the users facebook id
//                     newUser.facebook.token = token; // we will save the token that facebook provides to the user
//                     //newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
//                     //newUser.facebook.name  = profile.displayName.givenName + ' ' + profile.displayName.familyName; // look at the passport user profile to see how names are returned
//                     //console.log(profile.displayName);
//                     newUser.facebook.name = profile.displayName;
//                     newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
//
//                     // save our user to the database
//                     newUser.save(function(err) {
//                         if (err)
//                             throw err;
//
//                         // if successful, return the new user
//                         return done(null, newUser);
//                     });
//                 }
//
//             });
//         });
//
//     }));
//     /*
//     passport.use(new FacebookStrategy({
//
//             // pull in our app id and secret from our auth.js file
//             clientID        : configAuth.facebookAuth.clientID,
//             clientSecret    : configAuth.facebookAuth.clientSecret,
//             callbackURL     : configAuth.facebookAuth.callbackURL,
//             profileFields: ['id', 'displayName', 'emails'] //'link', 'about_me', 'photos',
//         },
//         // facebook will send back the token and profile
//         function(token, refreshToken, profile, done) {
//
//             // asynchronous
//             process.nextTick(function() {
//
//                 client.query("SELECT * FROM users WHERE facebook_id = '"+profile.id+"'",function(err,rows){
//                     //console.log("Hello ");
//                     // if there is an error, stop everything and return that
//                     // ie an error connecting to the database
//                     if (err)
//                         return done(err);
//                     //console.log("Hello ");
//                     // if the user is found, then log them in
//                     if (rows.length) {
//                         return done(null, rows[0]); // user found, return that user
//                     } else {
//                         //console.log("Hello ");
//                         // if there is no user found with that facebook id, create them
//                         var newUserMysql = new Object();
//
//                         // set all of the facebook information in our user model
//                         newUserMysql.facebook_id    = profile.id; // set the users facebook id
//                         newUserMysql.facebook_token = token; // we will save the token that facebook provides to the user
//                         newUserMysql.facebook_name  = profile.displayName; // look at the passport user profile to see how names are returned
//                         //newUserMysql.facebook_name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
//                         //console.log("Hello ");
//                         newUserMysql.facebook_email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
//
//                         var insertQuery = "INSERT INTO users (facebook_id, facebook_token, facebook_name, facebook_email) values ( '"+profile.id+"', '"+token+"' ,'"+profile.name.givenName+' '+profile.name.familyName+"', '"+profile.emails[0].value+"')";
//                           //var insertQuery = "INSERT INTO users ( facebook_id, facebook_token, facebook_name, facebook_email ) values ('" + facebook_id +"','"+ facebook_token +"','"+ facebook_name +"','"+ facebook_email +"')";
//                           //var insertQuery = "INSERT INTO users ( facebook_id, facebook_token, facebook_name, facebook_email ) values ('" + newUserMysql.facebook_id +"','"+ newUserMysql.facebook_token +"','"+ newUserMysql.facebook_name +"','"+ newUserMysql.facebook_email +"')";
//                             console.log(insertQuery);
//
//                         // save our user to the database
//                         client.query(insertQuery,function(err,rows){
//
//                             newUserMysql.id = rows.insertId;
//
//                             return done(null, newUserMysql);
//                         });
//                     }
//
//                 });
//
//             });
//
//         }));
// */
// }
