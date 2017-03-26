import Craw from './Craw.js';

import eventEmmiter from '../utils/events.js';
import eachLimit from 'async/eachLimit';
import ArticleCol from '../database-manager/Article.js';
import urlsManager from '../urls-manager/index.js';

import crawCSDNConfig from '../config/craw-csdn-config.js';
/**
 * 爬虫调度器
 * 一个browser进程，每时每刻都有5个爬虫并发的爬取
 */
// import eachLimit from 'async/eachLimit';
export default {
  page: 0,
  // url: ['http://blog.csdn.net/u013063153/article/details/52424176?locationNum=4&fps=1', 'http://blog.csdn.net/u013063153/article/details/52424176?locationNum=4&fps=1', 'http://blog.csdn.net/qibin0506/article/details/60478869'],
  url: ['http://blog.csdn.net/hustzw07/article/details/51386385?locationNum=5&fps=1', 'http://blog.csdn.net/sinat_17775997/article/details/54847009?locationNum=6&fps=1', 'http://blog.csdn.net/lidog/article/details/55517697?locationNum=7&fps=1', 'http://blog.csdn.net/qibin0506/article/details/60478869', 'http://blog.csdn.net/u013063153/article/details/52424176?locationNum=4&fps=1'],

  // 默认开启的爬虫数量
  defaultCrawNum: 3,

  // 可回收利用的pageInstance实例
  // recyclePageInstance: [],

  /**
   * 创建新的爬虫 
   * @param  {String} url 爬虫爬的网址
   */
  createCraw(url) {
    console.log('createCraw', url);
    this._phantomInstance.createPage()
      .then(pageInstance => {
        pageInstance.property('onResourceTimeout', function(request) {
          // console.log('Response (#' + request.id + '): ' + request.url);
        });
        pageInstance.property('onResourceRequested', function(requestData, request) {
          if ((/http[s]?:\/\/.+?\.((css)|(png)|(jpg)|(jpeg)|(gif)|(svg)|(ico)|(swf)|(woff2))/gi).test(requestData['url']) || requestData['Content-Type'] == 'text/css' || /google/gi.test(requestData['url']) ) {
            // console.log('The url of the request is matching. Aborting: ' + requestData['url']);
            request.abort();
          }
        });
        // todo
        // let url = this.url.replace(/\$\{\}/, this.page);

        new Craw({
          url: url,
          pageInstance: pageInstance,
          fileds: crawCSDNConfig.fileds,
        });
        // this.page++;
      })
      .catch(err => {
        console.log('createCraw err', err.toString())
      });
  },

  // 初始化默认数量的爬虫任务
  initDefaultCraw(phantomInstance) {
    for (let i = 0; i < this.defaultCrawNum; i++) {
      let url = this.url[this.page++];
      this.createCraw(url);
    }
  },

  //调度器任务开始
  start(phantomInstance) {
    this._phantomInstance = phantomInstance;

    this.initDefaultCraw();

    this.listenCrawWork();

    // this.listenMasterNotify();
  },

  // 监听爬虫工作
  listenCrawWork() {
    // 爬虫爬取文章后
    eventEmmiter.on('crawDone', (article, valuableUrlsArr) => {
      // console.log('eventEmmiter on crawDone', Object.keys(article), article['tags'], article['view-count'], article.toString(), valuableUrlsArr.length, valuableUrlsArr[0]);

      Promise.all([...valuableUrlsArr.map(function(url) {
        return urlsManager.push(url);
      }),ArticleCol.save(article)]).then(() => {
        console.log('______________________');
        this.addCrawIntoWork();
      })

      
      // console.log(articles[0].title.toString().substr(0, 40));
      // this.recyclePageInstance.push(pageInstance);

      // const rePageInstance = this.recyclePageInstance.shift();

      // 利用回收的pageInstance，构造新的爬虫
      // this.addCrawIntoWork();
      // process.send(article.title.toString().substr(0, 40));
    });
  },

  // 添加craw工作
  addCrawIntoWork() {
    // todo
    console.log('addCrawIntoWork');
    // // if (flag) {
      urlsManager.pop()
        .then(url => {  
          // 集合中若没有url,则url为null
          if (url && url.url) {
            this.createCraw(url.url);
          } else {
            // 若没有url todo
            console.log('没有url');
            let timer = setTimeout(() => {
              this.addCrawIntoWork();
              clearTimeout(timer);
            }, 5000);
          }
          
        });
    // }

    // if (this.page > 5) return;
    // // console.log('again,');
    // let url = this.url[this.page++];
    // // new Craw({
    // //   url: url,
    // //   pageInstance: pageInstance,
    // // });
    // this.createCraw(url);

  },

  // 监听主进程通知
  listenMasterNotify() {
    // 主进程通知后，补充新的爬虫
    process.on('message', () => {
      if (this.recyclePageInstance.length >= 1) {
        // 从可回收page数组中
        // const rePageInstance = this.recyclePageInstance.shift();


        this.addCrawIntoWork();
      }

    })
  },
}
