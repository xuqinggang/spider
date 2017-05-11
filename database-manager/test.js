function test() {
  return new Promise((resolve, reject) => {
    resolve('123');
  })
}

function test2() {
  return test()
    .then(data => {
      return Promise.resolve(data + '123')
    })
}
test2()
  .then(data => {
    console.log(data)
  });
// import Article from './Article.js';

// // Article.save({
// // 	link: '123'
// // })
// // .then(data => {
// // 	console.log(data);
// // })
// Article.find();
// Article.removeAll();
// 
// 
// var test = new Promise((resolve, reject) => {
// 	reject('123')
// })

// test.then(data => {
// 	console.log('data', data);
// 	return Promise.resolve(true)
// })
// .catch(data => {
// 	console.log('data', data);
// 	return Promise.reject(false)
// })
// .then(function(data){
// 	console.log('asdf', data)
// })
// .catch(err => {
// 	console.log(err)
// })
