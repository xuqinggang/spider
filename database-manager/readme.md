## 数据库设计

数据库 spider

表 articles{
	标题：title
	作者：author
	发布时间：publish_time
	内容简介：content_preview
	链接：link
	浏览数：view_count
	评论数：comment_count
	赞同书：agree_count
	分类：tags
}


主要用来去重
表 urls {
	hash
	url
}