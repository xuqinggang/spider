/**
 * phantom实例 等价于 浏览器
 * page实例 等价于 标签页
 */
/**
 * 控制page实例
 */

import phantomBrowser from './phantom-browser.js';

class phantomPage {

	constructor(config) {
		const phantomInstance = config.phantomInstance;
		this._page = phantomInstance.create
	}

}
// phantomBrowser.createPhantomInstance()

// export default {
// 	createPage(phantomInstance) {
// 		let pageInstance;
// 		phantomInstance.createPage()
// 		.then(page => {
// 			pageInstance = page;
// 		});
// 		return pageInstance;
// 	}

// }