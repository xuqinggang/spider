/**
 * phantom实例 等价于 浏览器
 * page实例 等价于 标签页
 */
/**
 * 控制phantom实例
 */

import phantom from 'phantom';

export default {
	phantomInstanceArr: [],
	createPhantomInstance() {
		let phantomInstance;
		phantom.create()
		.then(instance => {
			phantomInstance = instance;
		})
		return phantomInstance;
	},

	createPhantomInstanceOfNum(num) {
		num = parseInt(num, 10);
		for(let i = 0;i < num;i++) {
			this.phantomInstanceArr.push(this.createPhantomInstance());	
			// console.log(this.phantomInstanceArr)		
		}
		return this.phantomInstanceArr;
	}
	

}