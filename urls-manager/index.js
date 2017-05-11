import urlDatabase from '../database-manager/url.js';
// import { hashStr } from '../utils/utils.js';
const urlsManager = {
  // url索引位置
  // index: 0,
  position: 0,
  push(url) {
    // const index = this.index++;
    //在push之前将url hash ，判断数据库中有木有此url,达到去重目的
    const hash = hashStr(url);
    urlDatabase.hasOneByHash(hash)
      .then(bool => {
        // 没有找到该url
        if (bool == false) {
          urlDatabase.save({
            // index: index,
            hash: hash,
            url: url,
          })
          .then(doc => {
            return Promise.resolve(true);
          })
        } else {
          // console.log('找到重复的url!!!!,url:', url);
        }
      })
  },
  
  pop() {
    const position = this.position++;
    return urlDatabase.findOneByPosition(position)
      .then(url => {
        return Promise.resolve(url);
      })
  }
};
export default urlsManager;

// urlsManager.push('sdafsdf')
// urlsManager.pop().then(url => {
//  console.log(url);
// })
// urlsManager.pop(123).then(url => {
//  console.log(url);
// })
// export default urlsManager;
