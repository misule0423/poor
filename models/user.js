/*
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;


var user= new Schema({
  id:{type:Number, unique:true},

  local            : {
      email        : String,
      password     : String,
  },
  facebook         : {
      id           : String,
      token        : String,
      email        : String,
      name         : String
  },
  naver            : {
      id           : String,
      token        : String,
      displayName  : String,
      username     : String
  },
  google           : {
      id           : String,
      token        : String,
      email        : String,
      name         : String
  },
  password:String,
  cash:{type:Number,default:0},
  location:String,
  gender:Number,
  asks:[{type:Schema.ObjectId}],
  answers:[{type:Schema.ObjectId}],
  likes:[{type:Schema.ObjectId}],
  time:{type:Date, default:Date.now},
  dir_json:[String]
});


user.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
user.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

user.plugin(autoIncrement.plugin, { model: 'user', field: 'id' });
module.exports = mongoose.model('user',user);
*/


// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var user = new Schema({

  local            : {
      email        : String,
      password     : String,
      name         : String,
  },
  facebook         : {
      id           : String,
      token        : String,
      email        : String,
      name         : String
  },
  naver            : {
      id           : String,
      token        : String,
      email        : String,
      name         : String
  },
  google           : {
      id           : String,
      token        : String,
      email        : String,
      name         : String
  },

  birth:{type:String},
  cash:{type:Number,default:0},
  location:{type:String,default:null},
  gender:{type:String},
  asks:[{type:Schema.Types.ObjectId}],
  answers:[{type:Schema.Types.ObjectId}],
  likes:[{type:Schema.Types.ObjectId}],
  time: String,
  dir_json:[String]

});

// methods ======================
// generating a hash
user.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
user.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('user', user);
/*
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
    username: String,
    password: String,
    email: String,
    gender: String,
    address: String
});
*/
