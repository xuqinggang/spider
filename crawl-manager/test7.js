// unescape(text.replace(/&#x/g,'%u').replace(/;/g,'').replace(/%uA0/g,' '));
// let str = '&#x8BED;&#x8A00;&#x53C2;&#x8003;&#x624B;&#x518C;';
// function decode(str) {
// 	return unescape(str.replace(/&#x/g,'%u').replace(/;/g,'').replace(/%uA0/g,' '));
//   // return str.replace(/&#(\d+);/g, function(match, dec) {
//     // return String.fromCharCode(dec);
//   // })
// };
// console.log(decode(str));
// console.log(escape('语'))
// 
// import eventEmmiter from '../utils/events.js';

// eventEmmiter.on('test', data => {
// 	console.log(data, 'data')
// })

// eventEmmiter.emit('test', '123')
// 
var obj = {
	test: function() {
		(function(obj) {setTimeout(function() {
			console.log(this, obj)
		}.bind(this),0)}.bind(this))('123')
	}
}
obj.test();

// (function(obj){console.log(obj)})('123')