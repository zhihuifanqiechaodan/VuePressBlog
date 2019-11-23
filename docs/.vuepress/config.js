module.exports = {
    title: '只会番茄炒蛋', // 左上角标题
    description: 'VuePress Blog 的网站描述', // 网站描述, 用来SEO
    dest: 'dist', // dest默认值为.vuepress/dist，配置它可以显示的帮助我们设置打包文件的输出目录
    // 其它配置
    base: '/vuePressBlog/',
    themeConfig: {
      repo: 'https://github.com/wangtunan/blog', // nav最后一个GitHub链接
      repoLabel: 'Github',
      nav: [
        {   text: '首页', link: '/home/' },
        // {   text: 'HTML', 
        //     items: [
        //     { text: 'HTML', link: '/HTML/' },
        //     { text: 'CSS', link: '/CSS/' },
        //     { text: 'JavaScript', link: '/JavaScript/' }
        //   ] 
        // },
        {   text: '前端体系', link: '/note/' },
        {   text: '进阶文章', link: '/blog/' },
        {   text: '每日壹题', link: '/question/' },
        {   text: '个人简历', link: '/resume/' },
      ],
      sidebar: {
        '/note/': [
          {
            title: '1.HTML',
              children: [
                '/note/css/test' // 以docs为根目录来查找文件 
              ]
          },
          {
            title: '2.CSS',
              children: [
                '/note/html/1.HTML和HTML5'
              ]
          },
          {
            title: '3.JavaScript',
              children: [
                ['/note/javascript/1.javascript入门笔记', 'JavaScript基础笔记']
              ]
          },
          {
            title: '4.Vue',
              children: [
                ['/note/vue/1.vue2.0基础学习笔记', 'Vue2.0基础学习笔记'],
                ['/note/vue/2.vue2.0进阶学习笔记', 'Vue2.0进阶学习笔记']
              ]
          }
        ],
        '/': [
          ''
        ]
      },
      search: true,                // 通过配置此属性为false，来禁用内置搜索
      searchMaxSuggestions: 10,    // 通过配置此属性为一个数字，对内置的搜索进行最多结果数量的限制
      lastUpdated: true,           // 设置true，开启最后更新时间
      algolia: { // 配置全文搜索需要Algolia官网上添加自己的这个网址
        apiKey: '<API_KEY>',
        indexName: '<INDEX_NAME>'
      }
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