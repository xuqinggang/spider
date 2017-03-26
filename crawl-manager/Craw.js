import co from 'co';
import cheerio from 'cheerio';
import fs from 'fs';
import { decode, parseUrl } from '../utils/utils.js';
import crawCSDNConfig from '../config/craw-csdn-config.js';
import eventEmmiter from '../utils/events.js';
/**
 * 爬虫构造函数（一个爬虫等同于一个page页)
 * 根据url 爬取文章列表页
 */
export default class Craw {
  // static crawItmes = ['title', 'author', 'publish_time', 'content-preview', 'link', 'view-count', 'comment-count', 'tags'];

  constructor(config = {}) {

    // console.log('craw constructor');
    // 带爬取的文章
    this._article = null;

    // object ---- 带爬取的项
    this._crawItems = config.fileds;

    // phantomjs page实例 page: promise对象
    this._pageInstance = config.pageInstance;

    // 爬取得url
    this._url = config.url;

    // 有价值的urls数组
    this._valuableUrls = [];

    // url各部分值
    this._urlPart = parseUrl(this._url);


    this.startCraw();
  }

  // 开始
  startCraw() {
    co(function*() {

      const status = yield this._pageInstance.open(this._url);
      // 打开失败的url
      if (status != 'success') {
        // todo
        return;
      }
      console.log('status', status, this._url);

      // 由于内容可能是ajax或者js生成的，所以延迟获取content 
      setTimeout(() => {
        co(function*() {
          const content = yield this._pageInstance.property('content');
          this.parseHTML(content);
        }.bind(this));
      }, 1700);
    }.bind(this))
  }

  // 根据item项（要获取的文章的一些信息比如 title, author）
  getArticleItems($) {
    var article = {};
    // console.log('item', this._crawItems);
    // param item  ex: title, author, ....
    for (let item in this._crawItems) {
      const filed = this._crawItems[item];
      if (filed && filed.selector) {
        // 根据选择器获得元素
        const $ele = $(filed.selector);

        if (!$ele) {
          // console.log(`selector: ${filed.selector}, 未获取到该元素`);
          break;
        }
        let content;
        
        // 如果有prop 则获取prop的值
        if (filed.prop) {
          content = $ele.attr(filed.prop);
        } else if(filed.beforeProcess) {
          content = filed.beforeProcess($ele, $);
        } else {
          content = $ele.html();
        }
        if (!content) {
          break;
        }
        // 利用beforeProcess对元素进行预处理
          // if (filed.beforeProcess) {
          // article[item] = decode(filed.beforeProcess($ele, $));
        // } else {
          article[item] = decode(content);
        // }
      }
    }

    article.url = this._url;
    this._article = article;
    article = null;
  }

  /**
   * 获得有价值的urls，去除掉无用的
   * @param  {[type]} $ [description]
   * @return {[type]}   [description]
   */
  getValuableUrls($) {
    // 有价值的url正则表达式
    const patternValuableUrl = /(\/[0-9A-Za-z]+)\/article\/details\/\d+$/

    // urlPart ex: http://blog.csdn.cn:80
    let urlPart = `${this._urlPart.scheme}:${this._urlPart.slash}${this._urlPart.host}`;
    if (this._urlPart.port) {
      urlPart = `${urlPart}:${this._urlPart.port}`;
    }

    const $linkAll = $('a');
    // console.log($linkAll,'$linkAll');
    [].forEach.call($linkAll, (link) => {
      const linkHref = $(link).attr('href');
      if (linkHref) {
        if (patternValuableUrl.test(linkHref)) {
          if (linkHref.indexOf('http') !== -1) {
            this._valuableUrls.push(linkHref);
          } else {
            this._valuableUrls.push(`${urlPart}${linkHref}`);
          }
        }
      }
    });
    
  }

  // 解析html html: string
  parseHTML(html) {
    const $ = cheerio.load(html);
    this.getArticleItems($)
    this.getValuableUrls($);
    this.afterCraw();
  }

  // 文章爬取后
  afterCraw() {
    // console.log('afterCraw!!!', this._valuableUrls.length, this._article['title'])
    // 文章爬取结束后，调用close关闭资源
    this._pageInstance.close();
    // 文章爬取结束后, 通知调度器，并传递爬取结果（文章列表）和 有价值的urls数组
    eventEmmiter.emit('crawDone', this._article, this._valuableUrls);
    this.destoryConstructor();
  }

  // 对象的销毁
  destoryConstructor() {
    this._article = null;
    this._crawItems = null;
    this._pageInstance = null;
    this._url = null;
    this._urlPartArr = null;
    this._valuableUrls = null;
  }
}
