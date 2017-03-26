// var phantom = require('phantom');
import co from 'co';
import phantom from 'phantom';
// var resources = {name: 'xqg'}

co(function* () {
	var t = '123'
	const instance = yield phantom.create();
	const page = yield instance.createPage();
	page.on('onResourceRequested', true, (requestData, networkRequest) => {
		console.log(t, '!!!!', requestData.url)
		// console.log(requestData.url.indexOf('test.js'),'123');
		// // if(requestData.url.indexOf('test.js')!= -1) {
		// 	// networkRequest.abort();
		// // }
		// console.log('url:', requestData.url);
		// for( let head in requestData.headers) {
		// 	console.log('head', head)
		// 	for(let t in requestData.headers[head]) {
		// 		if(requestData.headers[head][t] === 'X-Requested-With')  {
		// 			// resources[requestData.id].name = '123';
		// 			console.log('head', requestData.headers[head].value, requestData.id)
		// 			// resources[requestData.id] = {};
		// 			// console.log(resources[requestData.id],'xxx')
		// 			// resources[requestData.id].name = '123xxx'
		// 			// console.log(resources[requestData.id].name)
		// 		}
		// 	}
		// 	// console.log('head', )
		// }
	})
	yield page.on('onResourceReceived', response => {
		console.log(response.id, 'responseid')
		// if(resources.indexOf(response.id)!=-1) {
		// 	console.log('response.id', resources[response.id]);
		// }
		console.log(response.toString().substr(0, 10), 'response', response.url);
	})
	const status = yield page.open('http://172.22.31.118/test/test.html');
	console.log('status', status);
	// page.property('content')
	// .then((data) => {
		// console.log(data)
	// })
	// setTimeout(function() {
	// 	page.evaluate(() => {
	// 	 return document.querySelector('.touch').innerText
	// 	}).then(data => {
	// 		console.log('data', data);
	// 	})
		// .catch(err => {
		// 	console.log(err)
		// })
	// }, 2000)
	// const innerText = yield page.evaluate(() => {
		 // return document.querySelector('.touch').innerText
	// });
	// console.log('innerText', innerText);
	// const content = yield page.property('content');

	// console.log('content', content);
	// setTimeout(function() {
		// test(page);
	// }, 3000);
	// yield instance.exit();
});
function test(page) {

	setInterval(() => {
		// console.log('123')
	page.property('content')
	.then((data) => {
		// console.log(data)
	})
	.catch(err => {
		console.log(err)
	})
	}, 3000)
}
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