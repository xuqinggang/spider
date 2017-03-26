// var hashCode = function(str) {
//   var hash = 0, i, chr, len;
//   if (str.length === 0) return hash;
//   for (i = 0, len = str.length; i < len; i++) {
//     chr   = str.charCodeAt(i);
//     hash  = ((hash << 5) - hash) + chr;
//     hash |= 0; // Convert to 32bit integer
//   }
//   return hash;
// };
// for(var i = 0;i < 10000000000;i++) {
// 	hashCode('wqerqw123123asfasfasf12312adsfasdf21dsfasfasfasfdsafae');
// }
// console.log('123')


console.log([...[1,23],5]);
// let obj = {
// 	name: 'xqg',
// 	sex: 'man',
// 	age: 20
// };
// for (let key in obj) {
// 	console.log(key);
// 	if(key == 'name') break ;
// }
// console.log(/google/gi.test('http://1google23.swf'))
// function tet() {
// 	var article = null;
// 	console.log('123',article.title)
// }
// tet();
// import urlCol from '../database-manager/url.js';
// urlCol.findOneByIndex(1000)
// .then(url => {
// 	console.log('url', url);
// })
// function test() {
//   return new Promise(function(resolve, reject) {
//     reject('123')
//   })
// }

// var t = test();
// t.then(function(data) {
//   console.log(data)
// })
// t.catch((err) => {
// 	console.log('err',err)
// })
