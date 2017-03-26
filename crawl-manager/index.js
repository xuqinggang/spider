import co from 'co';
import phantom from 'phantom';

import crawScheduler from './craw-scheduler.js'
co(function* () {
    const phantomInstance = yield phantom.create();
    crawScheduler.start(phantomInstance);
});
	// function test() {
	// 	return new Promise((resolve, reject) => {
	// 		resolve('123');
	// 	})
	// }
	// co(function* () {
	// 	const data = yield test();
	// 	return ;
	// 	const data1 = yield test();
		
	// 	console.log(data, data1,'!!')
	// });

// var webPage = require('webpage');
// var page = webPage.create();
// var pageTb = webPage.create();
// var tbUrl = "http://item.taobao.com/item.htm?id=520115087331";


// // page.settings.userAgent = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36";

// page.open(tbUrl, function(status) {
// 	console.log(status)
//     // 由于是拉取异步数据，我们打开页面后，等待12s再去操作dom，获取交易量
//     // setTimeout(function() {
//         var result = page.evaluate(function() {
//         	// return document.querySelector('.touch').innerText;
//             return document.getElementById("J_SellCounter").innerText;
//         });
//         console.log(result);
//         //生成当前页面截图
//         page.render("xuqintb2.png");
//         phantom.exit();
//     // },0);
// });
// var page = require('webpage').create();
// // var system = require('system');
//   // system = require('system');

// // if (system.args.length === 1) {
// //   console.log('Usage: loadspeed.js <some URL>');
// //   phantom.exit();
// // }

// var t = Date.now();
// // address = system.args[1];
// page.open('http://172.22.31.124/test/test.html', function(status) {
//   if (status !== 'success') {
//     console.log('FAIL to load the address');
//   } else {
//     t = Date.now() - t;
//     console.log('Loading success');
//     console.log('Loading time ' + t + ' msec');
//  	   setTimeout(function() {
//  	   	console.log('123')
//    var title = page.evaluate(function() {
//     return document.querySelectorAll('.touch')[0].innerText
//   });
//   console.log('Page title is ' + title);
//     }, 3000);
 
//     // var text = page.evaluate(function() {
//     	// return document.querySelectorAll('.touch')[0].innerText
//       // $("button").click();
//     // });
//     // console.log('123', text)
//   }
//   // phantom.exit();
// });
// var page = require('webpage').create();
// page.open('http://172.22.31.124/test/test.html', function(status) {
// 	console.log('status', status);
//   // page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
//     let text = page.evaluate(function() {
//     	return document.querySelectorAll('.touch')[0].innerText
//       // $("button").click();
//     });
//     console.log('123', text);
//     // phantom.exit()
//   // });
// });
// import phantom from 'phantom';
// import co from 'co';

// var phantom = require('phantom');

// phantom.create().then(function (ph) {
//     ph.createPage().then(function (page) {
//         page.open('http://172.22.31.124/test/test.html').then(function (status) {
//             console.log(status);
//             setTimeout(() => { //just added for enough delay for the scripts to render
//                 page.property('content').then(function (content) {
//                     console.log(content);
//                     page.close();
//                     ph.exit();
//                 });
//             }, 5000)
//         });
//     });
// });

// phantom.create()
//   .then((phantomIns) => {
//     return phantomIns.createPage();
//   })
//   .then((page) => {
//   	return page.open('http://172.22.31.124/test/test.html');
//   })
//   .then( html => {
//   	console.log(html)
//   });
// let t = [1, 2, 3]
// co(function*() {
//   const phantomIns = yield phantom.create();
//   const phantomPage = yield phantomIns.createPage();
//   const status = yield phantomPage.open('http://172.22.31.124/test/test.html');
//   // const content = yield phantomPage.property('content');
//   // console.log(content)
//   console.log(status);
//   setInterval(function() {
//   		phantomPage.property('content').then((content) => {
//   			console.log(content, 'content')
//   			// phantomPage.evaluate(function() {

//   			// })
//   		})
//       // phantomPage.evaluate(function() {
//         // console.log('11123')
//         // console.log(document.querySelectorAll('.touch')[0].innerText);
//         // return document.querySelectorAll('.touch')[0].innerHTML;
//       // }).then(function(html) {
//         // console.log(html);
//       // });
//     }, 1000)
//     // 	phantomPage.evaluate(function() {
//     // 		// console.log('11123')
//     // 		// console.log(document.querySelectorAll('.touch')[0].innerText);
//     //     return document.querySelectorAll('.touch')[0].innerHTML;
//     // }).then(function(html){
//     //     console.log(html);
//     // });
//     // setInterval(() => {
//     // phantomPage.evaluate(() => {
//     // console.log('123')
//     // console.log(document.querySelectorAll('.touch')[0].innerText);
//     // })
//     // console.log()
//     // }, 2000); 
//     // phantomPage.property('content').then(function(content) {
//     // 	console.log(content)
//     // });
//     // // console.log(content);
//     // setInterval(function (){
//     // phantomPage.property('content').then(function(content) {
//     // 	console.log(content,'123')
//     // });
//     // }, 2000)
//     // phantomPage.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js')
//     // .then(() => {
//     // 	console.log(t)
//     // 		// phantomPage.evaluate(() => {
//     // 	// return document.querySelectorAll('.touch')
//     // // })
//     // })
//     // // .then(touches => {
//     // 	// console.log(touches[0].innerText)
//     // // })


//   // const content = yield phantomPage.property('content');
//   // console.log(content,'123');
// })
