# Vue中跨域以及打包部署到nginx跨域

### 前言
众所周知,我们在做前后端分离项目的时候,经常需要在本地起前端工程,接口希望拉取服务端的实际数据而不是本地的mock数据,而如果本地程序直接访问远程接口， 肯定会遇到跨域问题。
### 什么是跨域?实现跨域的多种方式?
这里我就不详细介绍了,大家自行百度哈
### 为什么要实现前端跨域
一般来讲,前后端分离的项目在大公司都会由后台设置允许跨域访问,因为后台设置允许跨域是很简单和方便的,但是某些情况下,一些小公司或者你工作的场所后台不怎么配合的情况下,这就需要前端来配置跨域请求来方便我们使用接口
#### vue项目中的配置
以vue-cli搭建的项目为例, 在webpack配置文件 /config/index.js, 由于我们是在**开发环境**下使用，自然而然是要配置在dev里面,找到 proxyTable属性,配置如下:
```js
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    <!-- 使用proxyTable进行跨域设置 -->
    proxyTable: {
        '/api': {
          target: 'http://www.abc.com',  // 设置你调用的接口域名和端口号, 别忘了加http
          changeOrigin: true,  // 是否跨域
          pathRewrite: {
              // 这里理解成用'/api'代替target里面的地址，后面组件中我们掉接口时直接用api代替 
              // 比如我要调用'http://www.abc.com/user/add'，直接写'/api/user/add'即可'
            '^/api': '/'
          }
        }
    },

    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,
    cssSourceMap: true
  },
```
上面proxyTable属性中的配置,效果就是将本地8080端口的一个请求代理到了http://www.abc.com这个域名下

```js
'http://localhost:8080/api' ===> 'http://www.abc.com/'
```
**注意: 以上设置只能在开发环境下使用,打包后会出现路径问题的**

**注意: Vue-cli提供的代理功能，只是让你在开发环境下使用的，它(http-server-middleware)依赖于node环境，生产代码应该使用npm run build然后把dist放到nginx服务器上，在nginx上配置代理地址**
### Vue项目部署到nginx上的跨域设置
这还没完，现在我们要将项目部署到nginx上，此时原来可以访问的接口又访问不到了，所以这个时候还要对nginx进行设置。
#### windows系统下载nginx
* 下载地址: [http://nginx.org/en/docs/windows.html]()
![](https://user-gold-cdn.xitu.io/2019/8/25/16cc6575b720869a?w=1571&h=1575&f=png&s=387712)
* 选择download进去选择下载版本页面

![](https://user-gold-cdn.xitu.io/2019/8/25/16cc659a612b0d6a?w=1573&h=1456&f=png&s=319207)
* 这里选择稳定版下载即可

![](https://user-gold-cdn.xitu.io/2019/8/25/16cc65a41d63927c?w=1255&h=136&f=png&s=19410)
* 下载完成后目录如下

![](https://user-gold-cdn.xitu.io/2019/8/25/16cc65b0d7726268?w=1190&h=474&f=png&s=47830)
* 进入cong文件,打开nginx.congf文件,找到server对象里面的listen属性查看查看监听的端口号(默认80端口)

![](https://user-gold-cdn.xitu.io/2019/8/25/16cc661d9b733d85?w=1231&h=409&f=png&s=26949)
* 在nginx根目下启动nginx.exe,如果出现一个黑窗口一闪而过,说明启动成功,访问localhost:80出现此页面则访问成功

![](https://user-gold-cdn.xitu.io/2019/8/25/16cc6652305c8b94?w=1401&h=455&f=png&s=53358)
![](https://user-gold-cdn.xitu.io/2019/8/25/16cc664a2f725353?w=2053&h=570&f=png&s=94473)
* 如果访问不成功有可能是端口被占用,修改上面的端口号,重启nginx即可, 浏览器访问localhost:XXXX
#### Vue项目部署在nginx上的配置
* vue项目运行 npm run build 进行项目打包记得有本地静态资源文件的需要需要webpack配置, 如下:
```js
config文件下的index.js文件找到build属性
assetsPublicPath: '/'   =>>>>>   assetsPublicPath: './' 
```
![](https://user-gold-cdn.xitu.io/2019/8/25/16cc6695ccab18fc?w=1724&h=1126&f=png&s=279296)

```js
build文件下的untils文件中找到vue-style-loader
增加 publicPath: '../../'
```

![](https://user-gold-cdn.xitu.io/2019/8/25/16cc66c364882a00?w=1886&h=988&f=png&s=287935)
* 此时打包后的dist文件可以不放置服务器环境下访问, 直接打开dist文件目录下的index.html就可以打开访问

```js
这时候的静态资源都可以被加载出来,且不会报错,但是api访问的话还是会报错
```
![](https://user-gold-cdn.xitu.io/2019/8/25/16cc66f8321c6eea?w=2512&h=950&f=png&s=1277209)
* 将打包后的dist文件里面的内容复制一份到nginx文件中的html文件中

![](https://user-gold-cdn.xitu.io/2019/8/25/16cc6717b7bd4a65?w=1361&h=340&f=png&s=36570)

```js
打开html文件清空里面的内容,将复制的内容粘贴进去
```
![](https://user-gold-cdn.xitu.io/2019/8/25/16cc671c55473a00?w=1416&h=394&f=png&s=53192)

![](https://user-gold-cdn.xitu.io/2019/8/25/16cc672a64683778?w=1314&h=317&f=png&s=28354)
* 进入cong文件,打开nginx.congf文件,找到server属性在里面新增一条配置

```js
	location /api {			
		proxy_pass http://localhost:4000/;			
	}
```

![](https://user-gold-cdn.xitu.io/2019/8/25/16cc675e8b58aca0?w=1218&h=708&f=png&s=156029)

```js
你要访问那个地址这里就修改为你要访问的那个地址
```
![](https://user-gold-cdn.xitu.io/2019/8/25/16cc67569354770a?w=1242&h=700&f=png&s=81797)
* 以上配置就全部完成啦

**注意: 修改完nginx中的配置一定要重启nginx才可以, 切记!!!**
### nginx简单的操作命令

```js
nginx.exe -s stop // stop是快速停止nginx，可能并不保存相关信息
nginx.exe -s quit // quit是完整有序的停止nginx，并保存相关信息
nginx.exe -s reload // 当配置信息修改，需要重新载入这些配置时使用此命令
nginx.exe -s reopen // 重新打开日志文件
nginx -v // 查看Nginx版本
```
**以上就是我在项目中使用的配置啦,还有一些更高级的配置还没有接触使用到,供大家参考**