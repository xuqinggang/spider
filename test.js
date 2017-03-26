const Crawler = require("crawler");
const co = require("co");
const cheerio = require("cheerio");
const json2csv = require("json2csv");
const fs = require("fs");

// let test = co.wrap(function*() {
//     // console.log(123)
//     return new Promise((resolve, reject) => {
//         console.log('123')
//         setTimeout(() => {resolve(true)}, 1000)
//     })
// });

// co(function*() {
//     for(let i = 0;i < 10;i ++) {
//         yield test();
//         console.log('123111');
//     }
// })
var c = new Crawler({
    rateLimit: 1112000,
    maxConnections: 1,
    callback: function(error, res, done) {
        if(error) {
            console.log(error)
        } else {
            var $ = res.$;
            console.log($('title').text())
        }
        done();
    }
})
c.queue({
            url: 'http://www.admin5.com/article/20170209/715499.shtml',
        forceUTF8: true,
        callback: function(error, result, $) {
          if (error || !result.body) {
            errorCount++;
            console.log('error')
            // return resolve({ result: false });
          }
          result = result.body;
          console.log( '1');
          // resolve({ error, result, $ })
        }
})
c.queue({
            url: 'http://www.admin5.com/article/20170209/715678.shtml',
        forceUTF8: true,
        callback: function(error, result, $) {
          if (error || !result.body) {
            errorCount++;
            console.log('error')
            // return resolve({ result: false });
          }
          result = result.body;
          console.log('2');
          // resolve({ error, result, $ })
        }
})
c.queue({
            url: 'http://www.admin5.com/article/20170209/715320.shtml',
        forceUTF8: true,
        callback: function(error, result, $) {
          if (error || !result.body) {
            errorCount++;
            console.log('error')
            // return resolve({ result: false });
          }
          result = result.body;
          console.log('3');
          // resolve({ error, result, $ })
        }
})
// let c = new Crawler({
//   maxConnections: 15,
//   retries: 1,
//   retryTimeout: 3000
// });

// let contentJson = [];
// let id = 0;
// let errorCount = 0;

// const getHtml = co.wrap(function*(html) {
//   console.log(html, 'url');
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       c.queue({
        // url: html,
        // forceUTF8: true,
        // callback: function(error, result, $) {
        //   if (error || !result.body) {
        //     errorCount++;
        //     console.log('error')
        //     return resolve({ result: false });
        //   }
        //   result = result.body;
        //   console.log('test')
        //   resolve({ error, result, $ })
        // }
//       })
//     }, 2000)
//   })

// });




// const getContent = co.wrap(function*(body) {
//   let $ = cheerio.load(body);
//   let title = $(".sherry_title>h1").text();
//   let content = $(".content").text();

//   return Promise.resolve({ title, content })
// });

// let t = 0;
// const getSubHtml = co.wrap(function*(body) {
//   let $ = cheerio.load(body);
//   let UrlElems = $("a.sherry_title");
//   let subUrlList = [];
//   UrlElems.each((i, e) => {
//     let url = $(e).attr('href');
//     let href = `${url}`;
//     subUrlList.push(href);
//   });
//   console.log(subUrlList, 'subUrlList', subUrlList.length);
//   subUrlList.splice(0, 10)
//   for (let item of subUrlList) {
//     console.log('item', item)
//     let { result, $ } = yield getHtml(item);
//     if (!result) {
//       console.log('continue')
//       continue;
//     }
//     console.log($.toString(),'$')
//     // console.log(++t, 't')
//     let { title, content } = yield getContent(result);
//     console.log(`${title}获取完毕`);
//     id++;
//     contentJson.push({
//       id,
//       title,
//       content
//     })

//   }
//   console.log('end');
// });

// let urlList = [];

// for (let i = 1; i <= 1; i++) {
//   urlList.push(`http://www.admin5.com/browse/19/list_${i}.shtml`)
// }
// co(function*() {
//   for (let url of urlList) {
//     let { result } = yield getHtml(url);
//     if (!result) {
//       continue;
//     }
//     //console.log("result",result);
//     //获取当页所有SUB
//     yield getSubHtml(result);
//     console.log('123')
//   }
//   console.info(`全部爬取完毕,一共爬取${id}错误次数为${errorCount}`);
//   let r1 = json2csv({ data: contentJson, fields: ['id', 'title', 'content'] });

//   fs.writeFile("./admin5.com.csv", r1, () => {

//   });
// }).catch((err) => {
//   console.log(err)
// });



// process.on('unhandledRejection', function(err) {
//   console.error(err.stack);
// });

// process.on(`uncaughtException`, console.error);
