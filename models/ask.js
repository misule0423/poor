var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ask= new Schema({
  asker:Schema.Types.ObjectId,
  viewers:{type:Number,default:0},
  likers:{type:Number,default:0},
  name:String,
  email:String,
  status:Number,
  ask_img_dir:[{type:String}],
  comment:String,
  tag:[{type:String}],
  reward:{type:Number,default:0},
  view:{type:Number,default:0},
  time:{type:Date, default:Date.now},
  gender:String,
  clothes:{
    size:Number,
    delivery_location:String,
    product_gender:Number,
    color:String,
    etc:String
  },

  answers:[{
    answer:Schema.Types.ObjectId,
    name:String,
    email:String,
    time:{type:Date,default:Date.now},
    status:Number,
    brand:String,
    price:Number,
    link:String,
    isDelivery:Number,
    ans_img_dir:String,
    comment:String
  }]

});


module.exports = mongoose.model('ask',ask);
