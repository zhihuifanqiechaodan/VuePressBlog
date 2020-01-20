# 入门TypeScript

## TypeScript是什么？
TypeScript 是一种由微软开发的自由和开源的编程语言。它是 JavaScript 的一个超集，TypeScript 在 JavaScript 的基础上添加了可选的静态类型和基于类的面向对象编程。

其实TypeScript就是相当于JavaScript的增强版，但是最后运行时还要编译成JavaScript。TypeScript最大的目的是让程序员更具创造性，提高生产力，它将极大增强JavaScript编写应用的开发和调试环节，让JavaScript能够方便用于编写大型应用和进行多人协作。
## TypeScript和JavaScript的对比
TypeScript 与JavaScript两者的特性对比，主要表现为以下几点：

* TypeScript是一个应用程序级的JavaScript开发语言。（这也表示TypeScript比较牛逼，可以开发大型应用，或者说更适合开发大型应用）
* TypeScript是JavaScript的超集，可以编译成纯JavaScript。这个和我们CSS离的Less或者Sass是很像的，我们用更好的代码编写方式来进行编写，最后还是有好生成原生的JavaScript语言。
* TypeScript跨浏览器、跨操作系统、跨主机、且开源。由于最后他编译成了JavaScript所以只要能运行JS的地方，都可以运行我们写的程序，设置在node.js里。
* TypeScript始于JavaScript，终于JavaScript。遵循JavaScript的语法和语义，所以对于我们前端从业者来说，学习前来得心应手，并没有太大的难度。
* TypeScript可以重用JavaScript代码，调用流行的JavaScript库。
* TypeScript提供了类、模块和接口，更易于构建组件和维护。
## 开发环境的安装

* 安装Node.js

```js
安装Node.js非常简单，只要到Node官网下载一个最新版本就可以了：
https://nodejs.org/zh-cn/.在windows上的安装方法和安装QQ一样。
安装好后，可以打开命令行工具，同时按下win+R，然后输入cmd就可以打开，打开后输入
node -v
npm -v
```
* 安装TypeScript包

```js
打开命令行工具，同时按下win+R，然后输入cmd就可以打开，打开后输入
npm install typescript -g  //安装TypeScript包
tsc --version // 检查安装的TypeScript的版本
```
* 初始化项目

```js
1.新建一个文件夹typescript-demo, 在当前文件夹内打开命令行输入 npm init -y 
  来初始化项目生成package.json文件
2.在命令行输入 tsc --init来生成tsconfig.json文件,它是一个TypeScript项目的配置文件，
  可以通过读取它来设置TypeScript编译器的编译参数。
3.在命令行输入 npm install @types/node --dev-save安装这个模块,这个主要是解决模块的声明文件问题。
4.新建一个helloWord.ts文件, 代码如下:
    let a: string = "番茄炒蛋" 
    console.log(a)
5.用Vscode打开typescript-demo文件夹,在Vscode的任务菜单下，打开运行生成任务，然后选择tsc：构建-tsconfig.json
  这时候就会生成一个helloWorld.js文件
6.在终端中输入node helloWorld.js就可以看到结果了。
```
## TypeScript中的变量类型
* Undefined类型

```js
在js中当你定义了一个变量，但没有给他赋予任何值的时候，他就是Undefined类型。这可能和你以前学的语言稍有不同，其他语
言会有个类型的默认值。
比如我们要声明一个年龄的变量age,我们要使用数值类型，也就是Number,但是我们不给他任何的值，我们只是在控制台给它输出，
然后我们来看结果。新建demo.ts文件，输入下面代码：
//声明数值类型的变量age，但不予赋值
let age:number
console.log(age)
写完后保存代码，进行运行任务，然后生成demo.js，在终端中使用node demo.js来进行查看运行结果。
控制台输出了undefined
```
* Number类型
```js
在TypeScript中，所有的数字都是Number类型，这不分是整数还是小数。
let age:number = 18
let stature:number = 178.5
console.log(age)
console.log(stature)
写完后保存代码，进行运行任务，然后生成demo.js，在终端中使用node demo.js来进行查看运行结果。
/*-------在TypeScrip中有几种特殊的Number类型-------*/
    NaN：它是Not a Number 的简写，意思就是不是一个数值。
    Infinity :正无穷大。
   -Infinity：负无穷大。
```
* string类型
```js
由单引号或者双引号括起来的一串字符就是字符串
let fanqie:string = "只会番茄炒蛋"
console.log(fanqie)
```
* boolean布尔类型

```js
作任何业务逻辑判断都要有布尔类型的参与，通过对与错的判断是最直观的逻辑处理。boolean类型只有两种值，true和false。
var b:boolean = true
var c:boolean = false
```
* enum 类型
后续更新。。。