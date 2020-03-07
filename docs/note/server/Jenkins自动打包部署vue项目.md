---
title: Jenkins自动打包部署vue项目
date: 2019-10-05
categories:
 - Serve
tags:
 - Serve
---

`Jenkins是直接部署到阿里云服务器ECS上的, 服务器系统:  CentOS  7.2 64位`

## 第一步: 服务器安装Java
jenkins是运行在java环境中的,所以要先安装java,配置java环境变量后才能使用。
* 卸载系统自带的jdk

```js
// 查找系统jdk 
rpm -qa|grep java 

// 如果查找到了 先全部卸载了在重新安装
rpm -e --allmatches --nodeps java包名
// 例如
rpm -e --allmatches --nodeps java-1.8.0-openjdk-1.8.0.212.b04-0.el7_6.x86_64

//检查是否卸载干净
[root@VM_0_2_centos ~]#  rpm -qa|grep java 
```
* 查找yum下可更新的Java列表

```js
yum -y list java*
//或者
yum search jdk
```

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b5e3dc057f98?w=1281&h=1229&f=png&s=274374)
* 安装java

```js
yum install -y java-1.8.0-openjdk.x86_64
//验证完成安装
java -version
```

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b5ebadfc1aeb?w=1254&h=123&f=png&s=22874)
* 配置环境变量

```js
// 打开文件
vi /etc/profile  

// i 进入编辑模式
// 文件末尾加入以下内容
export JAVA_HOME=/usr/lib/jvm/jre-1.8.0-openjdk
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar

// 点击键盘ESC键 输入 :wq // 退出并保存
```

```js
//使配置文件生效
source /etc/profile 
source ~/.bash_profile
//或重启机器配置生效
reboot
```
## 服务器安装Jenkins
* 检查是否安装好Java

```js
java -version // 如果没有出现版本号请按照上述步骤重新安装
```
* 获取jenkins安装源文件   

```js
wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat/jenkins.repo
```
* 导入公钥 (如果报错，多执行几次就好了) 

```js
yum -y update nss
rpm --import https://jenkins-ci.org/redhat/jenkins-ci.org.key
```
* 安装Jenkins

```js
yum install -y jenkins   // 看网速需要等待一会
```
* 配置文件修改( 默认端口为8080) 

```js
vim /etc/sysconfig/jenkins
// 修改了默认端口为 8888
// 修改了用户名为 root
// 如果没被占用你可以不改
```
* 启动Jenkins

```js
 service jenkins start
```

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b70d41872425?w=922&h=75&f=png&s=11268)
## 启动 jenkins
* 浏览器输入 http://ip:8888， ip:服务器外网ip地址 例：http://47.16.213.xxx:8888

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b72fa85c57f2?w=1308&h=769&f=png&s=155202)
* 等待一会之后 提示你输入管理员密码

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b73488cd5074?w=1588&h=1455&f=png&s=368281)

```js
// 打开服务器输入上述的命令
vi /var/lib/jenkins/secrets/initialAdminPassword
```

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b758ae7a43c6?w=1196&h=191&f=png&s=61498)
复制管里面密码到页面
* 安装插件

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b76b378190e7?w=1616&h=1371&f=png&s=419585)
* 点击推荐安装,稍等片刻，会出现

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b774cb01d6f8?w=1609&h=1476&f=png&s=359216)

```js
这个时候安装的的插件会比较多，耗时有点久。耐心等待。
安装完插件之后 创建第一个管理员用户
```

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b77c1ec753af?w=1620&h=1481&f=png&s=229499)
继续点击保存并完成

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b782989fa4b4?w=1580&h=1452&f=png&s=307181)
点击开始使用 jenkins 这个时候 jenkins就已经配置成功了。
## Jenkins创建一个构建任务

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b794bc279d86?w=1952&h=1038&f=png&s=271262)

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b79e3ae8d81a?w=1492&h=1341&f=png&s=239389)
这里我代码仓库用的是GitHub(码云也一样的)

输入仓库地址。因为仓库是私有的所以会有报错提示 这里要添加Credentials。就是你码云或者github账号。


![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b7dddc84d08d?w=1422&h=1013&f=png&s=119978)

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b7d433a4ae1d?w=1841&h=778&f=png&s=97676)
这里可以填一下要构建的分支

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b7ea441be540?w=1397&h=368&f=png&s=48826)
回到首页 ==> 就会看到一个 tomato-admin 的构建任务

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b7f69a49cf78?w=2445&h=571&f=png&s=117640)
点击立即构建

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b812e6d47099?w=1679&h=957&f=png&s=233507)
jenkins构建任务已经完成
## 配置 Jenkins 构建时执行的shell脚本
点击配置
![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b8246feb3c32?w=1617&h=938&f=png&s=225690)
点击增加构建步骤
![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b839d5ce60fc?w=1417&h=1635&f=png&s=218174)
点击执行shell
![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b83d98996849?w=511&h=381&f=png&s=36489)
输入shell命令
```js
// 下载工作区npm依赖包
npm install
// 删除dist目录下的所有文件,dist目录即为当前jenkins工作区打包后的文件
rm -rf ./dist/*
// 执行打包命令
npm run build
// 删除服务器上/usr/local/apache2/htdocs/tomato文件夹下的所有文件
rm -rf /usr/local/apache2/htdocs/tomato/*
// 把当前构建工作区dist目录里的文件 copy 到服务器/usr/local/apache2/htdocs/tomato文件夹下
cp -rf ./dist/* /usr/local/apache2/htdocs/tomato
```
保存后点击立即构建吗, 发现构建报错了(红色圆点即为构建失败,蓝色成功)

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b892a6046479?w=1369&h=1329&f=png&s=253413)
点击进入此次构建详情 => 点击控制台输出 => 查看报错信息

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b8a64a465cc7?w=1465&h=889&f=png&s=521717)
**Jenkins默认是没有安装node插件的,所有没有npm命令**
手动安装node插件

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b8b255eb3f84?w=2220&h=1270&f=png&s=321567)

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b8bc6ea08dbd?w=2038&h=354&f=png&s=135733)
安装成功后点击全局工具配置

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b8c53e862b19?w=2431&h=1042&f=png&s=273268)
新增NodeJS

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b8ce6d332d14?w=1916&h=939&f=png&s=115655)
**返回tomato-admin配置空间,点击构建环境**

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b8ddf5fa7e1b?w=1439&h=943&f=png&s=141521)
保存后点击立即构建 第一次构建 会执行 npm install 下载很多包 会很慢

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b901d635d87e?w=1103&h=268&f=png&s=35710)

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b90611646ccd?w=1640&h=1301&f=png&s=207811)
这样就构建成功了 通过域名或者浏览器去访问文件夹名称即可

```js
// http://zhihuifanqiechaodan.com/tomato
```

![](https://user-gold-cdn.xitu.io/2019/10/2/16d8b982ef80de9b?w=2471&h=606&f=png&s=794418)