开启4个爬虫进程，每个爬虫进程并发5个page页，（爬虫任务，负责向数据库写入article，和 urls）;
当每个爬虫结束后，通知从数据库中取url，创建新的爬虫
若取不到url，则等待爬虫的数量加1，若等待爬虫的数量达到5的话，则说明没有url入库，到此结束


爬虫模块：{
	参数:url, page实例（tab标签页）	
	1.爬取某个具体文章 ，按field存储
	2.
}

url控制模块：{

	1.去重
	结构： {
		1. articlesUrl = [],
		
	}
}


phantom控制模块 {
	1.实例化page
	2.支持ajax请求 {
		1）.首屏ajax请求（没有请求再次发出，且接收到该请求url的response)
		2）.后续点击事件的ajax请求
	}
}

cluster控制模块 {
	
}
问题：
1.
phantomjs 
并发的时候，重复利用page实例，传入不同的url,也可能会导致获取到的内容是上一个url里的内容（内容不准确）
所以解决办法，是关闭pageInstance,重新创建一个新的pageInstance

2.node cluster多个进程都可以连接数据库，访问数据库

3.
问题：爬虫并发，向数据库url集合中写入文档时，如果利用index来标识文档位置，因为在写入之前会实现查找是否存在，（不是百分之百的写入，）所以会存在文档记录的index，存在不连续的情况。那么，pop的时候会产生url获取不到的情况
解决：不利用index标识了。改成，pop的时候，利用skip来取第几条记录。