var webpage = require('webpage'),
  page = webpage.create();
var fs = require('fs');
// page.viewportSize = { width: 1024, height: 800 };
// page.clipRect = { top: 0, left: 0, width: 1024, height: 800 };
// page.settings = {
  // javascriptEnabled: true,
  // loadImages: true,
  // webSecurityEnabled: false,
  // userAgent: 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.137 Safari/537.36 LBBROWSER'
    //要指定谷歌ua,我用火狐无法浏览
// };
var lastReceived = new Date().getTime();
var requestCount = 0;
var responseCount = 0;
var requestIds = [];
var startTime = new Date().getTime();

page.onLoadStarted = function() {
  page.startTime = new Date();
}; //获取页面开始加载的时间



page.open('http://172.22.31.118/test/test.html', function(status) {
  console.log('start');
  // var tt = page.evaluate(function() {
        // console.log('document.getElementById("J_SellCounter").innerText', document.getElementById("J_SellCounter").innerText);
        // return document.getElementById("J_SellCounter");
        // return '123';
        //判断页面加载完成的信号,
        // return $("a:first-child", ".goods-list-items").length > 0;
      // });
  // console.log('12344111', tt)
  if (status === 'fail') {
    console.log('open page fail!');
  } else {
    waitFor(function() {
        // console.log('12344')
        // return 'xxx'
      return page.evaluate(function() {
        // console.log('document.getElementById("J_SellCounter").innerText', document.getElementById("J_SellCounter").innerText);
        return document.querySelector('.touch').innerText
        // return '123';
        //判断页面加载完成的信号,
        // return $("a:first-child", ".goods-list-items").length > 0;
      });
    }, function() {
      //页面加载完成后我们的DOM操作,
      //引入外部js库
      page.includeJs("http://xxxx/jquery-1.9.1.min.js", function() {
        page.evaluate(function() { //操作页面事件
          console.log("jQuery version:" + jQuery.fn.jquery);
          $("a", ".goods-list-items").each(function() {
            console.log($(this).attr("href"));
          });
        });

        setTimeout(function() {
          page.render('../snapshot/taoba2o.png');
        }, 2000);
        //console.log()
        var t = Date.now() - page.startTime; //页面加载完成后的当前时间减去页面开始加载的时间，为整个页面加载时间
        console.log('firstLoadPage time :' + t + 'ms');
        console.log("end");
        setTimeout(function() {
          page.close();
          phantom.exit();
        }, 0);
      });
    });
  }
});

function screan(filename) {
  page.render(filename);
}


function waitFor(testFx, onReady, timeOutMillis) {
  var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3000, //< Default Max Timout is 3s
    start = new Date().getTime(),
    condition = false;
    console.log('12344,', testFx());
    var interval = setInterval(function() {
      // if ((new Date().getTime() - start < maxtimeOutMillis) && !condition) {
        // console.log('123')
        // If not time-out yet and condition not yet fulfilled
        screan('../snapshot/taobao.png');
        console.log('123,', testFx());
      //   condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
      // } else {
      //   if (!condition) {
      //     // If condition still not fulfilled (timeout but condition is 'false')
      //     console.log("'waitFor()' timeout");
      //     phantom.exit(1);
      //   } else {
      //     // Condition fulfilled (timeout and/or condition is 'true')
      //     console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
      //     typeof(onReady) === "string" ? eval(onReady): onReady(); //< Do what it's supposed to do once the condition is fulfilled
      //     clearInterval(interval); //< Stop this interval
      //   }
      // }
    }, 250); //< repeat check every 250ms
};

page.onCallback = function(data) {
  console.log('CALLBACK: ' + JSON.stringify(data));
  // Prints 'CALLBACK: { "hello": "world" }'
};


page.onAlert = function(msg) {
  console.log('ALERT: ' + msg);
};

page.onConsoleMessage = function(msg, lineNum, sourceId) {
  console.log('CONSOLE:' + msg);
  //var d = "http://h5.m.taobao.com/awp/core/detail.htm?id=43064483679";
  // var re = new RegExp("[/?id=]+[0-9]{11}");
  // var arr = (msg.match(re));
  //if (arr != null) {
  //    console.log(msg.match(re)[0].replace("?id=", ""));
  //}
};


// page.onError = function(msg, trace) {
//   var msgStack = ['ERROR: ' + msg];
//   if (trace && trace.length) {
//     msgStack.push('TRACE:');
//     trace.forEach(function(t) {
//       msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function+'")' : ''));
//     });
//   }

//   console.error(msgStack.join('\n'));

// };
