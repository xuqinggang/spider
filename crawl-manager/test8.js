// import './test7.js';
// import eventEmmiter from '../utils/events.js';
// eventEmmiter.emit('test', 'sadf123');
// 
// 

// const obj = {
// 	page: 1,
// 	url: function() {
// 		console.log(this.page)
// 	}
// }


// export default obj;
// 
// var str = '<a href="#comments" onclick="_gaq.push([&apos_trackEvent&apos,&aposfunction&apos, &aposonclick&apos, &aposblog_articles_pinglun&apos])">评论</a>(1)';

// console.log(str.match(/\((\d+)\)/im))[0];
// 
import fs from 'fs';


for(var i = 0;i < 10;i++) {
	fs.writeFile('message2.txt', '<a href="#comments" onclick="_gaq.push([&apos_trackEvent&apos,&aposfunction&apos, &aposonclick&apos, &aposblog_articles_pinglun&apos])">评论</a>(1)'+'@@@@@@@', {
            flag: 'a'
            }, (err) => {
              // console.log('err!!!!!',err);
  });
}