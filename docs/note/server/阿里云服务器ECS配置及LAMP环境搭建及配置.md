---
title: 阿里云服务器配置及LAMP环境搭建
date: 2019-10-02
categories:
 - Serve
tags:
 - Serve
---

说起做一个阿里服务器ECS配置文章也是因为买了一个服务器好几年了, 一直没有好好玩过, 基本也就是自己放一些node项目和vue项目展示用, 今天初始化一下服务器,重新配置一番,顺便做个新手笔记给大家参考
## 服务器配置
这是我自己的服务器配置, 自己玩是足够了
![](https://user-gold-cdn.xitu.io/2019/10/1/16d85e65bf85f744?w=575&h=295&f=png&s=14940)
## ECS云服务器配置及环境
* 登录阿里云服务器[官网](https://www.aliyun.com/?utm_medium=text&utm_source=bdbrand&utm_campaign=bdbrand&utm_content=se_32492&accounttraceid=07f8d1b7-6256-4907-a549-913d71b2537c)

![](https://user-gold-cdn.xitu.io/2019/10/1/16d85ed4752e50ac?w=2220&h=962&f=png&s=1491682)
* 左侧导航 => 控制台 

![](https://user-gold-cdn.xitu.io/2019/10/1/16d85e8478576117?w=1126&h=734&f=png&s=81811)
* 进入云服务器ECS

![](https://user-gold-cdn.xitu.io/2019/10/1/16d85ee466409db4?w=1773&h=1073&f=png&s=151782)
* 进入实例

```js
选择你当时购买的服务器机房
```
![](https://user-gold-cdn.xitu.io/2019/10/1/16d85f014adcddf4?w=2215&h=1066&f=png&s=160784)
* 管理

```js
- 停止（关机）
- 才能切换系统
```

![](https://user-gold-cdn.xitu.io/2019/10/1/16d85f10cd6ba7d4?w=1308&h=541&f=png&s=65469)
* 返回实例,找到更多 => 磁盘和镜像 => 更换系统盘


![](https://user-gold-cdn.xitu.io/2019/10/1/16d85f51726b8379?w=941&h=492&f=png&s=54096)

* 公共镜像 (镜像和我一样哈, 不然会有一些稍微的不同)

```js
centOS 7.2 64
```
* 设置密码

```js
- 大家字母 + 小写字母 + 数字
- 尽量取个简单点，方便记
```
![](https://user-gold-cdn.xitu.io/2019/10/1/16d85f4a1a29303a?w=2013&h=1798&f=png&s=251180)
* 系统启动成功完成之后，所有配置都是在命令行中操作
## putty软件连接 ECS服务器
软件我上传到了[百度网盘](https://pan.baidu.com/s/18s_9nHFHBdWDzaDMMQQ81A)开箱即用,体积不到1M, 当然也有其他的软件请自行百度

![](https://user-gold-cdn.xitu.io/2019/10/1/16d86015d34f6fc2?w=679&h=611&f=png&s=71194)
* IP

```js
你服务器的公网IP
```
* 端口

```js
22
```
* 连接类型

```js
ssh
```
* 登录

```js
- 第一次会生成密钥
- 自己个人电脑 是
- 公用电脑 否
```
* putty命令行

```js
- root
- 密码 （切换系统的时候设置的密码）
- 输入的时候没有提示，直接输入
- 就能进入服务器
```

![](https://user-gold-cdn.xitu.io/2019/10/1/16d8644b30a63722?w=993&h=628&f=png&s=41680)
* 远程连接(阿里云官网提供的)

```js
第一次会弹窗 让你记录下密码，很重要，保存到电脑上，会经常用到
```
![](https://user-gold-cdn.xitu.io/2019/10/1/16d8607d32622b00?w=2202&h=389&f=png&s=93277)
## Node 环境搭建
windows系统的电脑搭建Node环境是很简单的,服务器也一样
* 下载FileZilla
```js
方便直接创建目录上传文件等等
```
* 登录站点

![](https://user-gold-cdn.xitu.io/2019/10/1/16d860f31da5db8f?w=984&h=749&f=png&s=60268)
![](https://user-gold-cdn.xitu.io/2019/10/1/16d860e931d89bd0?w=1716&h=1392&f=png&s=244108)
* 新建一个文件来管理
```js
我新建了一个tomato文件专门来存放我配置的东西方便自己查找操作
```
* 打开putty命令行

```js
cd /                进入根目录
ls                  查看目录
cd tomato/node/     进入我刚创建的tomato文件下的node文件夹
wget https://nodejs.org/dist/v12.11.0/node-v12.11.0-linux-x64.tar.gz    下载node压缩包
tar xvf node-v12.11.0-linux-x64.tar.gz                                  解压node压缩包
rm -rf node-v12.11.0-linux-x64.tar.gz                                   删除node压缩包
cd node-v12.11.0-linux-x64/bin                            ls查看目录，你会看到 node npm
```
**设置全局(环境变量),在任何目录都可能运行 node 和 npm 命令**

```js
ln -s /tomato/node/node-v12.11.0-linux-x64/bin/node /usr/local/bin/node
ln -s /tomato/node/node-v12.11.0-linux-x64/bin/npm /usr/local/bin/npm
```
完成上述配置,即可在任何目录运行node和npm命令了
![](https://user-gold-cdn.xitu.io/2019/10/1/16d862090c447192?w=2210&h=1194&f=png&s=271690)

![](https://user-gold-cdn.xitu.io/2019/10/1/16d86211ea00527c?w=1869&h=1163&f=png&s=383880)
![](https://user-gold-cdn.xitu.io/2019/10/1/16d861c83eba7d44?w=990&h=627&f=png&s=42413)
## 利用FileZilla上传项目

```js
- 主机
  - 公网ip
- 端口
  - 22
- 协议
  - ssh
- 登录类型
  - 正常
- 用户名
  - root
- 密码
  - 你的密码
```
![](https://user-gold-cdn.xitu.io/2019/10/1/16d860f31da5db8f?w=984&h=749&f=png&s=60268)

```js
写一个js,用node运行起来,然后通过公网ip的形式访问, 这里我写了一个简单的接口文件
```
http.js

```js
const http = require('http')
const request = require('http').request
const fs = require('fs')

// 代理跨域
const fn = response => {
    const options = {
        host: "localhost",
        port: 4001,
        method: "get",
        path: "/"
    }
    //执行就发起请求了
    const req = request(options, res => {
        // console.log(res);
        let data = {}
        res.setEncoding("utf8")
        res.on("data", (chunk) => {
            console.log(`响应主体:${chunk}`);
            // 将data赋值为第三方代理请求回来的数据
            data = chunk
        })
        res.on("end", (chunk) => {
            response.write(data)
            response.end()
        })
    })
    // 监听报错
    req.on("error", err => {
        console.log(err);
    })
    req.write("")
    req.end()
}

const server = http.createServer((request, response) => {
    // 和请求相关的信息都在 request 里面
    // 后台给客户端返回的数据, 都在 response 里面

    // CORS跨域  设置允许跨域
    response.setHeader("Access-Control-Allow-Origin", "*")

    // 设置响应头, 第一个参数 http 状态码, 第二个参数是一个对象
    // response.writeHead(2010, {
    //     "Content-Type": "text/pligin;charset=utf-8" //设置内容的类型
    // })
    // response.write()可以调用多次
    // response.write()0向客户端返回数据, 这里返回的中文会乱码,因此需要设置响应头
    // response.write("向客户端返回数据~~~")
    // response.write(request.url) // 请求路径
    // response.write(request.method) // 请求方式
    // response.write(JSON.stringify(request.headers)) // 请求头信息

    // response.end()结束响应, 不然会一直处于响应状态不结束, 只能调用一次
    // response.end("~~~我是response.end()返回的数据") // end也可以返回数据, 必须传字符串

    if (request.method === "GET") {
        response.writeHead(200, {
            "Content-Type": "text/html;charset=utf-8"
        })
        switch (request.url) {
            case "/":
                // response.write(fs.readFileSync("../demo/index.html", "utf8")) // 同步执行
                response.write(JSON.stringify({
                    a: 1,
                    b: 2
                })) // 同步执行
                response.end()
                break;
            case "/home":
                //home
                fs.readFile("../demo/index.html", "utf8", (err, data) => { // 异步执行
                    response.write(data)
                    response.end()
                })
                break
            case "/request": //代理跨域
                fn(response)
                break
            default:
                // 404
                response.write("<h1>404页面<h1>")
                response.end()
                break;
        }
    }
    // response.end()
    // 配置请求
})
// 监听6300端口
server.listen(6300, () => {
    console.log("服务监听在6300端口");
})
```
![](https://user-gold-cdn.xitu.io/2019/10/1/16d862d92e35d6e6?w=848&h=1062&f=png&s=73595)
将写好的http.js文件放到nodeDemo文件中运行

![](https://user-gold-cdn.xitu.io/2019/10/1/16d8633e01511e9d?w=988&h=172&f=png&s=22361)
**然后通过公网ip的形式访问，会发现访问不了，原因是没有开放端口**
## 安全组开放访问端口

```js
- 进入实例
- 安全组
- 配置规则
- 添加安全规则
- 协议类型 TCP
  - 80/80
  - 6000/9999
  - 443/443
- 协议类型 HTTP/HTTPS
  - 80/80
- 授权类型：地址段访问
- 授权对象
  - 0.0.0.0/0
```

![](https://user-gold-cdn.xitu.io/2019/10/1/16d86345ee01c124?w=899&h=993&f=png&s=59026)

![](https://user-gold-cdn.xitu.io/2019/10/1/16d863499800c035?w=902&h=990&f=png&s=60033)
这时候通过公网ip的形式访问就能拿到数据了


![](https://user-gold-cdn.xitu.io/2019/10/1/16d86473e84642a7?w=949&h=159&f=png&s=17381)
## 域名绑定服务器
* 在阿里云购买域名

![](https://user-gold-cdn.xitu.io/2019/10/1/16d863ef01636180?w=2234&h=780&f=png&s=168766)

![](https://user-gold-cdn.xitu.io/2019/10/1/16d863fcc2d48a00?w=997&h=727&f=png&s=49696)
* 通过域名访问刚刚的node项目

![](https://user-gold-cdn.xitu.io/2019/10/1/16d8641369906267?w=1677&h=243&f=png&s=21251)
## 域名需要备案

```js
只需要进入备案专区
按照流程操作, 官方有流程图,就可以备案成功
备案成功的时间大概最快需要15天左右, 慢的话需要一个月
备案通过了,才能够使用域名访问虚拟主机的项目
```
## LAMP环境搭建及配置

```js
linux + apache + mysql + php

时间较长

服务器都可以用命令操作的

默认是没有图形界面的，但是可以自个百度 安装图形界面 

centOS 图形界面

```
[来自阿里云官方论坛的文档](https://help.aliyun.com/document_detail/50774.html?spm=a2c4g.11186623.6.766.1fXGjs)按照这个文档配置就可以了

LAMP指Linux+Apache+MySQL/MariaDB+Perl/PHP/Python，是一组常用来搭建动态网站或者服务器的开源软件。它们本身都是各自独立的程序，但是因为常被放在一起使用，拥有了越来越高的兼容度，共同组成了一个强大的Web应用程序平台。
## 常用命令

```js
// ECS服务器
cat /etc/redhat-release     // 查看系统版本
systemctl status firewalld  // 命令查看当前防火墙的状态
systemctl stop firewalld    // 临时关闭防火墙,重启Linux后,防火墙还会开启
ystemctl disable firewalld  // 永久关闭防火墙

// Apache
httpd -v                    // 查看Apache的版本号
systemctl start httpd       // 启动Apache服务
systemctl restart httpd     // 重启Apache服务
systemctl enable httpd      // 开机自启动Apache服务

// MySQL
systemctl start mysql       // 启动MySQL服务
systemctl enable mysql      // 开机自启动MySQL服务
mysqladmin -u root password // 修改MySQL的root用户密码
mysql -uroot -p             // 登录MySQL数据库
\q                          // 退出MySQL
```
## 阿里云ECS服务器优惠码/[优惠卷地址](https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=1ysggcln)

![](https://user-gold-cdn.xitu.io/2019/10/1/16d85e0f69694ec5?w=100&h=100&f=png&s=1527)