/**
 * 测试skip效率相对find查询比较低，
 */
import './connect.js';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;

let urlSchema = new Schema({
  // index: Number,
  hash: String,
  url: String,
});


let UrlModel = mongoose.model('url', urlSchema);
var tmp = Date.now();

UrlModel.findOne({'_id': {$gt: '5913d4bb8aa7eaa96804b4eb'}})
.then(doc => {
  console.log(doc);
  console.log(Date.now() - tmp);
});
var tmp2  = Date.now();
UrlModel.findOne({}, 'url', { skip: 40000 }).limit(1)
.then(doc => {
  console.log(doc);
  console.log(Date.now() - tmp2);
})