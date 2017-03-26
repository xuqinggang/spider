var page = require('webpage').create();
// var system = require('system');
  // system = require('system');

// if (system.args.length === 1) {
//   console.log('Usage: loadspeed.js <some URL>');
//   phantom.exit();
// }

page.onResourceRequested = function(requestData, networkRequest) {
  console.log('url', requestData.url)
};
var a = 1;
var url = [];
page.onResourceReceived = function(response) {
  // console.log('Response (#' + response.id + ', stage "' + response.stage + '"): ' + response.url, a);
  url.push(response.url);
  console.log(response.url,'url');
  // console.log(url, 'urls');
};
var t = Date.now();
// address = system.args[1];
page.open('http://172.22.31.118/test/test.html', function(status) {
  console.log(status);
  
  // if (status !== 'success') {
  //   console.log('FAIL to load the address');
  // } else {
  //   t = Date.now() - t;
  //   console.log('Loading success');
  //   console.log('Loading time ' + t + ' msec');
 	  //  // setTimeout(function() {
 	  //  	console.log('123')
  //  var title = page.evaluate(function() {
  //  	// return '123'
  //   return document.querySelectorAll('.touch')[0].innerText
  // });
  // console.log('Page title is ' + title);
    // }, 3000);
 
    // var text = page.evaluate(function() {
    	// return document.querySelectorAll('.touch')[0].innerText
      // $("button").click();
    // });
    // console.log('123', text)
  // }
  // phantom.exit();
});
