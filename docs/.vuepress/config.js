module.exports = {
  title: '番茄学前端', // 左上角标题
  description: 'Enjoy when you can, and endure when you must.', // 网站描述, 用来SEO
  dest: 'dist', // dest默认值为.vuepress/dist，配置它可以显示的帮助我们设置打包文件的输出目录
  port: 8080,
  host: '127.0.0.1',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  theme: 'reco',
  // 其它配置
  base: '/',
  themeConfig: {
    author: 'Gao Yu',
    authorAvatar: '/author.jpg',
    // logo: '/favicon.ico',
    // 备案
    record: '京ICP备18034129号',
    recordLink: 'http://www.beian.miit.gov.cn/',
    // cyberSecurityRecord: '公安部备案文案',
    // cyberSecurityLink: '公安部备案指向链接',
    // 项目开始时间，只填写年份
    startYear: '2019',
    type: 'blog',
    friendLink: [
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        logo: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: 'https://vuepress-theme-reco.recoluan.com'
      },
      {
        title: '午后南杂',
        desc: 'Enjoy when you can, and endure when you must.',
        email: 'recoluan@qq.com',
        link: 'https://www.recoluan.com'
      },
      // ...
    ],
    // 博客配置
    blogConfig: {
      category: {
        location: 2,     // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认文案 “分类”
      },
      tag: {
        location: 3,     // 在导航栏菜单中所占的位置，默认3
        text: 'Tag'      // 默认文案 “标签”
      }
    },
    // repo: 'https://github.com/zhihuifanqiechaodan', // nav最后一个GitHub链接
    // repoLabel: 'Github',
    // icon: 'reco-github',
    nav: [
      { text: 'Home', link: '/', icon: 'reco-home' },
      { text: 'TimeLine', link: '/timeLine', icon: 'reco-date' },
      { text: 'Resume', link: '/resume/', icon: 'reco-account' },
      {
        text: 'Contact',
        icon: 'reco-message',
        items: [
          { text: 'Github', link: 'https://github.com/zhihuifanqiechaodan', icon: 'reco-github'},
          { text: 'WeChat', link: '/resume/', icon: 'reco-wechat' },
          { text: '掘金', link: 'https://juejin.im/user/5b613134e51d451986517cc3', icon: 'reco-juejin' },
          { text: '头条', link: 'https://mp.toutiao.com/profile_v3/index', icon: 'reco-toutiao' }
        ]
      },
    ],
    // sidebar: {
    //   '/note/': [
    //     {
    //       title: 'Vue',
    //       children: [
    //         '/note/vue/基础学习笔记',
    //         '/note/vue/进阶学习笔记',
    //         '/note/vue/源码解析之手写Vue源码',
    //         '/note/vue/进度条和数据加载Loading',
    //         '/note/vue/跨域以及打包部署到nginx跨域',
    //         '/note/vue/使用阿里iconfont图标',
    //         '/note/vue/使用富文本',
    //         '/note/vue/导出Excel',
    //         '/note/vue/axios的应用及封装',
    //       ]
    //     },
    //     {
    //       title: 'React',
    //       children: [
    //         '/note/react/react基础学习笔记',
    //         '/note/react/如何在React中使用Redux'
    //       ]
    //     },
    //     {
    //       title: 'JavaScript',
    //       children: [
    //         '/note/javascript/基础学习笔记',
    //         '/note/javascript/进阶学习笔记',
    //         '/note/javascript/面向对象编程',
    //         '/note/javascript/函数提升与变量提升',
    //       ]
    //     },
    //     {
    //       title: 'TypeScript',
    //       children: [
    //         '/note/typescript/入门TypeScript'
    //       ]
    //     },
    //     {
    //       title: 'Node',
    //       children: [
    //         '/note/node/入门级别的接口',
    //         '/note/node/入门级别的爬虫'
    //       ]
    //     },
    //     {
    //       title: '服务器',
    //       children: [
    //         '/note/server/阿里云服务器ECS配置及LAMP环境搭建及配置',
    //         '/note/server/Jenkins自动打包部署vue项目'
    //       ]
    //     },
    //   ],
    //   '/question/': [
    //     {
    //       title: '1.JavaScript',
    //       children: [
    //         '/question/javascript/javascript进阶问题汇总' // 以docs为根目录来查找文件 
    //       ]
    //     }
    //   ],
    //   '/': [
    //     ''
    //   ]
    // },
    search: true,                // 通过配置此属性为false，来禁用内置搜索
    searchMaxSuggestions: 10,    // 通过配置此属性为一个数字，对内置的搜索进行最多结果数量的限制
    lastUpdated: true,           // 设置true，开启最后更新时间
    // algolia: { // 配置全文搜索需要Algolia官网上添加自己的这个网址
    //   apiKey: '<API_KEY>',
    //   indexName: '<INDEX_NAME>'
    // }
  },
  markdown: {
    // 显示代码块行号
    lineNumbers: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@images': '../images'
      }
    }
  }
}