import './connect.js';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;

let urlSchema = new Schema({
  // index: Number,
  hash: String,
  url: String,
});


let UrlModel = mongoose.model('url', urlSchema);
export default {
  save(infoObj) {
      return new UrlModel(infoObj)
        .save()
        .then((doc) => {
          // console.log(`url document (${infoObj.url}) save success`);
          return Promise.resolve(doc);
        })
        .catch(err => {
          console.log(`url document (${infoObj.url}) save error`, err.toString());
          // return Promise.reject(err);
        })
    },

    hasOneByHash(hash) {
      // 查找条件纬where hash=，查出的字段为_id
      return UrlModel.findOne({ hash: hash }, '_id')
        .then(doc => {
          if (doc) {
            return Promise.resolve(true);
          } else {
            return Promise.resolve(false);
          }
        })
        .catch(err => {
          console.log('url connection findOneByHash error', err.toString());
          // return Promise.reject(err);
        })
    },

    findOneByPosition(position) {
      return UrlModel.findOne({}, 'url', { skip: position }).limit(1)
        .then(url => {
          return Promise.resolve(url);
        })
        .catch(err => {
          console.log('[error]: url connection findOneByPosition error', err.toString());
          // return Promise.reject(err);
        })
    },

    findOneByIndex(index) {
      return UrlModel.findOne({ index: index }, 'url')
        .then(url => {
          return Promise.resolve(url);
        })
        .catch(err => {
          console.log('[error]: url connection findOneByIndex error', err.toString());
          // return Promise.reject(err);
        })
    },
}
