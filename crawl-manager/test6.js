import co from 'co';
import phantom from 'phantom';
import cheerio from 'cheerio';
import { decode } from '../utils/utils.js';
import crawCSDNConfig from '../config/craw-csdn-config.js'
import Craw from './craw.js';
// import Craw
/**
 * 知乎
 * url https://www.zhihu.com/search?type=content&q=js+%E5%89%8D%E7%AB%AF
 */
/**
 *  文章
 *  标题
 *  作者
 *  发布时间
 *  内容简述
 *  文章链接
 *  赞同数
 *  评论数
 * 
 */

/**
 * csdn
 * url http://so.csdn.net/so/search/s.do?q=javascript&q=javascript
 * http://so.csdn.net/so/search/s.do?p=3&q=javascript&t=blog&domain=&o=null&s=null&u=null&l=null&f=null
 * http://so.csdn.net/so/search/s.do?q=javascript+%E5%89%8D%E7%AB%AF&t=null&o=null&s=null&l=null
 */
// function parseHTML()
var instance;
co(function*() {
  instance = yield phantom.create();
  const page = yield instance.createPage();
  // const userAgent = yield page.setting('userAgent');

  // console.log(userAgent,'userAgent');
  // console.log(page.settings.userAgent,'userAgent');
  const status = yield page.open('http://localhost/test/test.html');
  console.log('123', status)

  setTimeout(function() {
    co(function*() {
      const content = yield page.property('content');

      // // new Craw().parseHTML(content);
      const $ = cheerio.load(content);

      console.log($('.touch').html());
    })

  }, 2000);

  // $('.search-list').find('dt a').map((i, child) => {
  //    console.log('a', decode($(child).html()));
  //  })
  // // const tt = yield page.close();
  // // console.log(tt, page.open);
  // // console.log('close', tt);

  // const status2 = yield page.open('http://so.csdn.net/so/search/s.do?p=2&q=javascript&t=blog&o=null&s=null&l=null');
  // console.log('status2', status2);
  // const content2 = yield page.property('content');
  // // new Craw().parseHTML(content);
  // const $2 = cheerio.load(content2);

  // $2('.search-list').find('dt a').map((i, child) => {
  //     console.log('a', decode($(child).html()));
  //  })

  // for (var i = 2; i < 5; i++) {
  // asyncPage(i);
  // }
  // console.log(status);
  // waitFor(function() {
  //  setTimeout
  // }, )
  // console.log('test')
  // const content = yield page.property('content');
  // console.log('content', content.toString().substr(0, 10));
  // console.log($);
});

// 并发请求文章列表页  by页码页
// function asyncPage(pageIndex) {
//   co(function*() {
//     console.log('1pageIndex', pageIndex)
//     const page = yield instance.createPage();
//     console.log('2pageIndex', pageIndex)
//     const status = yield page.open(`http://so.csdn.net/so/search/s.do?p=${pageIndex}&q=javascript&t=blog&domain=&o=null&s=null&u=null&l=null&f=null`);
//     console.log(pageIndex, status, 'status')
//     const content = yield page.property('content');
//     new Craw().parseHTML(content);
//     // const $ = cheerio.load(content);  
//     // $('.search-list dt a').map((i, child) => {
//     //   console.log('a', $(child).html());
//     // })
//     // console.log('a', decode($($('.search-list dt a')[1]).html()));
//   });
// };
// let _ph, _page, _outObj;
// var tmp = {};
// var url = [];
// tmp.test = function(data) {
//  console.log('test',data, this);
//  this.url = [];
//  this.url.push(data);
//  // url.push(data);
//  console.log(this.url, 'urls!!!!!')
// }
// phantom.create().then(ph => {
//   _ph = ph;
//   return _ph.createPage();
// }).then(page => {
//   _page = page;
//   _outObj = _ph.createOutObject();

//   _outObj.urls = [];
//   page.property('onResourceRequested', function(requestData, networkRequest, out) {
//     out.urls.push(requestData.url);
//     // networkRequest.abort();
//   }, _outObj);
//   page.property('onResourceReceived', function(response) {
//    // tmp.test(response.url).bind(test);
//    // console.log('123',tmp);
//    // console.log('response', response.url, Object.kesy(out))
//   })
//   return _page.open('http://172.22.31.118/test/test.html');
// }).then(status => {
//   return _outObj.property('urls');
// }).then(urls => {
//   console.log(urls);
//   _page.close();
//   _ph.exit();
// }).catch(console.error);

// co(function*() {
//   const instance = yield phantom.create();
//   const page = yield instance.createPage();

//   var outObj = instance.createOutObject();
//   outObj.urls = [];
//   outObj.name = 'xqg'
//   var t = 123;
//   // outObj.test = function() {
//   //   console.log('!!!');
//   // }
//   var tmp = {};
//   tmp.urls = [];
//   tmp.sex = 'man1'
//   // after call to page.open()
//   page.property('onResourceRequested',function(requestData, networkRequest, out) {
//    // console.log('request', requestData.url);
//     out.urls.push(requestData.url);
//     out.sex = 'man'
//     console.log('urls', out.urls, Object.keys(out), out.sex);
//     // var url = requestData.url;
//     // out.name = '123'
//     // outObj.test();
//   }, tmp);
//   console.log(tmp,'!!!')
//   // var mm = page.on('onResourceReceived', true, function(response, out) {
//   //   // out.property('urls').then(function(urls) {
//   //     // console.log('response out urls:',urls);
//   //   // });
//   //   console.log('response', response.url,response.id);
//   //   out.sex = '1244'
//   //   console.log('response out', Object.keys(out),'123', out.sex, out.urls, out.name);
//   //   // return '123';
//   //   // console.log(out.urls,'xxx','');
//   //   // out.property('urls').then(function(urls) {
//   //     // console.log('!!!');
//   //   // });
//   //   // console.log('1231312', Object.keys(out))
//   //   // console.log('!!!', out.urls,'22')
//   //   // console.log(requestData.url);
//   //   // out.urls.push(requestData.url);

//   //   // var url = requestData.url;
//   //   // outObj.property('urls').then(function(urls) {
//   //   // console.log('444333');
//   // // });

//   // }, outObj)
//   // console.log('@@@@@',mm)
//   // var urls = [];
//   // page.on('onResourceRequested', true, (requestData, networkRequest, urls) => {
//   //   console.log(requestData.url)
//   //   urls.push(requestData.url);
//   // }, urls);
//   const status = yield page.open('http://172.22.31.118/test/test.html');
//   setTimeout(function() {
//    console.log('tmp', tmp.urls, tmp)
//    console.log(Object.keys(outObj),'out', outObj.urls)
//   }, 10000);
//   // outObj.on('urls').then(function(urls) {
//   //   console.log(urls,'333');
//   // });
//   console.log('status', status);


//   // setTimeout(function() {
//   // console.log(outObj.urls, '123');
//   // }, 1000)
// });
