import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/spider');

var db = mongoose.connection;

db.on('error', function callback (err) {
  console.log("Connection error", err);
});

db.once('open', function callback () {
 	console.log("Mongo working!");
});


// export {
// 	ArticleModel
// }
// // export ArticleModel;