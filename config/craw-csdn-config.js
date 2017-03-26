export default {
  scanUrls: [],
  // commonSelector: 'dl.search-list',
  fileds: {
    title: {
      name: 'title',
      alias: '文章标题',
      selector: 'span.link_title a',
      // value: 
    },
    author: {
      name: 'author',
      alias: '文章作者',
      selector: 'span a.user_name',
    },
    time: {
      name: 'time',
      alias: '文章发布时间',
      selector: 'span.link_postdate',
    },
    'content-preview': {
      name: 'content-preview',
      alias: '文章内容简述',
      selector: '#article_content',
      // 对获取结果的预处理 | 可以对结果做一些转换
      beforeProcess: function($ele, $) {
        let eleHtml = $ele.html();
        if (!eleHtml) return ;
        return eleHtml.toString().substr(0, 50);
      },
      // beforeProcess: function(content) {
      //   return content.toString().substr(0, 50);
      // },
    },
    link: {
      name: 'link',
      alias: '文章链接',
      selector: 'span.link_title a',
      prop: 'href'
    },
    'view-count': {
      name: 'view-count',
      alias: '文章浏览次数',
      selector: 'span.link_view',
      beforeProcess: function($ele, $) {
        let eleHtml = $ele.html();
        if (!eleHtml) return ;
        return eleHtml.match(/(\d+)/im)[1];
      },
      // beforeProcess: function(content) {
      //   return content.match(/(\d+)/im)[1];
      // },
    },
    'comment-count': {
      name: 'comment-count',
      alias: '文章评论次数',
      selector: 'span.link_comments',
      beforeProcess: function($ele, $) {
        let eleHtml = $ele.html();
        if (!eleHtml) return ;
        return eleHtml.match(/\((\d+)\)/im)[1];
      },
      // beforeProcess: function(content) {
      //   return content.match(/\((\d+)\)/im)[1];
      // },
    },
    'tags': {
      name: 'tags',
      alias: '文章的标签',
      selector: 'span.link_categories a',
      beforeProcess: function($eles, $) {
        return [].reduce.call($eles, (acc, ele) => {
          let eleHtml = $(ele).html();
          // if (!eleHtml) return ;
          return eleHtml ? acc.concat(eleHtml) : acc;
        }, []);
      }
    }
  }
}
// export default crawCsdnConfig;
