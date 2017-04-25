import './connect.js';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;

let articleSchema = new Schema({
  title: String,
  author: String,
  publish_time: Date,
  content_preview: String,
  link: String,
  url: String,
  view_count: Number,
  comment_count: Number,
  tags: [String]
});

let ArticleModel = mongoose.model('article', articleSchema);

const Article = {
	// 保存文档
  save: function(infoObj) {
    return new ArticleModel(infoObj)
      .save()
      .then((doc) => {
        console.log('article document save success');
        return Promise.resolve(doc);
      })
      .catch(err => {
      	console.log('article document save error', err.toString());
        return Promise.reject(err);
      })
  },
  // 移除所有文档
  removeAll: function() {
  	
  	return ArticleModel.remove({})
  	.then(info => {
  		console.log('article document removeAll success');
  		return Promise.resolve(info);
  	})
  	.catch(err => {
  		console.log('article document removeAll error', err.toString());
      return Promise.reject(err);
  	})
  },

  find: function() {
    ArticleModel.findOne({link:'123'})
    .then(doc => {
      console.log(doc)
    })
    .catch(err => {
      console.log('err', err);
    })
  }

}

// Article.save({
//   title: '1234:'+process.pid
// });
export default Article;
