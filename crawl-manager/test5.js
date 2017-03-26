// var page = require('webpage').create();

// page.open("http://172.22.31.118/test/test.html", function(status) {
//   if (status === "success") {
//     console.log(page.title);
//   } else {
//     console.log("Page failed to load.");
//   }
//   // phantom.exit(0);
// });
// var resources = [];
// page.onResourceRequested = function (request) {
// 	console.log(request.id, request.url)
//     resource = {
//         "startTime": request.time,
//         "url": request.url
//     };
//     resources[request.id] = resource;
// };
// var tt = '123';
// page.onResourceReceived = function (response) {
//     if(response.stage == "start") {
//         resources[response.id].size = response.bodySize;
//         console.log(resources[response.id].startTime,'resources', tt)
//     } else if(response.stage == "end") {
//         resources[response.id].endTime = response.time;
//     }
// };

// // 监听资源文件加载完成事件，获取加载完成时间；
// // 监听资源文件请求事件，获取资源发起请求的时间；