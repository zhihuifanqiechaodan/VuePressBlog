# JavaScript基础学习笔记
本片文章记录一下当时自己学习JavaScript的过程以及一些知识点和注意事项,从基础到中高级的内容都有,会以章节的形式慢慢展示出来
## 学前准备
* 学习基础：DIV+CSS基础扎实
* 开发工具: sublime/webstorm/VScode等等
## 第一章 初识JavaScript
#### JavaScript（JS）是什么?
* JavaScript一种直译式脚本语言，是一种动态类型、弱类型、基于原型的语言。
* JavaScript通常用来操作HTML页面，响应用户操作，验证传输数据等
* java和JavaScript有什么关系？java和JavaScript没有关系
* jQuery和JavaScript有什么关系？jQuery是由JS编写的一个js库。
#### JS代码写在哪里？
* 内嵌 js，
* 外链 js文件里面，利用src属性引入
* 标签属性里面（不推荐）
* script标签中的属性type="text/javascript"或language=”javascript”，HTML5新规则下可以什么都不用加；
* script标签可以放置于任何位置，不同的位置要注意加载顺序，通常放在head或body结束之前；
#### 写JS代码需要注意什么?
* 严格区分大小写；
* 语句字符都是半角字符；（字符串里面可以使任意字符）
* 某些完整语句后面要写分号 (;)
* 代码要缩进，缩进要对齐。
#### JS里的系统弹窗代码
* alert('内容')
* confirm('确定?)
* prompt('请输入您的姓名:')
#### 变量
很多时候，当我们重复使用某个元素或者某个数据时，内容可能太长或者数据要进行改变，这时就需要定义变量来代替他们。

语法：`var` + `变量名` 或者 `let` + `变量名` (var 和 let 声明的区别见后续章节)
#### Js中的注释
* 单行注释 //
* 多行注释 /* */
#### 获取元素
* 特殊的标签

```js
document.body
document.head
document.title
```
* 一般标签
```js
document.getElementById()       // 匹配ID名称…
ele.getElementsByTagName()      // 匹配标签名是…的集合动态方法
document.getElementsByName()    // 匹配name是…的集合 动态方法
ele.getElementsByClassName()    // 匹配class名称…的集合 动态方法
ele.querySelector()             // 匹配css选择器的第一个
ele.querySelectorAll()          // 匹配css选择器匹配的所有集合
```
#### 获取和修改元素HTML
* 元素HTML内容
```js
// ele代表获取的元素
ele.innerHTML             // 获取元素HTML
ele.innerHTML = '字符串'  // 修改元素HTML
```
* 元素文本内容
```js
// 标准
ele.textContent             // 获取元素文本
ele.textContent = '字符串'  // 修改元素文本

// 非标准(ie低版本)
ele.innerText               // 获取元素文本
ele.innerText = '字符串'    // 修改元素文本
```
## 第二章 函数、自定义属性、事件
#### 变量与属性的区别

```js
//此为变量
var a = 123;  

//此时object 为节点对象（node）
var object = document.getElementById('box');

//为object自定义了abc属性，且此属性的值888888
object.abc = 888888; 

// 对象.属性名 可以获取属性值
object.abc； //888888 
```
* 属性分为 : 节点属性 和 js属性
* 节点属性 : 元素自带属性
* js属性 : js中自定义的属性

当js属性为合法节点属性的时候，可以修改节点属性的值

```js
//此时object 为节点对象（node）
var object = document.getElementById('box')

// 修改节点对象object的id属性, id属性为节点对象的合法属性
var object.id = 'box';
```
### 函数
####  函数申明
* 有名函数

```js
// 此时abc就代表此函数，函数不会自动运行，需要调用运行。
function abc(){
    console.log(我是有名字的函数)
}
```
**带名字的函数，需函数名加小括号运行，如abc();**
* 匿名函数

```js
function (){} 
```
**匿名函数，不进行赋值会报错**
* 函数表达式

```js
// 匿名函数
var a = function(){}
a() //此时用变量名加()来调用

//匿名函数
var b = function abc(){}
b() //此时用变量名加()来调用; 如果abc()调用会报错
```
#### 函数/对象方法
* 对象可以自定义属性
* 对象的属性，如果赋值的是一个函数function(){}, 称之为对象的方法

```js
// 此时object 为节点对象（nodelist）
var object = document.getElementById('box'); 
// 为object自定义了方法
object.abc = function(){}; 
```
### 事件属性
事件 : 是当事人，在特定的时间在特定的地点发生了某事
* js中的事件: 元素.事件属性 = 事件函数

```js
// 获取当前符合条件的节点
var object = document.getElementById('box');
// 给当前节点添加一个点击事件, 配合这对应的处理函数
object.onclick = function(){}
```
**function () {}是一个固定的写法，在这个例子中，它被称之为事件函数。**

事件函数也可以使用有名函数
```js
var object = document.getElementById('box');
object.onclick =  fn;
function fn(){}
```
* javascript中的事件 **[ 鼠标事件, 键盘事件, 表单事件, 系统事件, 等等]**
```js
onclick —————— 点击（单击）事件
onmouseover ———– 鼠标滑入事件（会冒泡）
onmouseout—————鼠标离开事件（会冒泡）
onmouseenter————鼠标滑入事件（不会冒泡）
onmouseleave————鼠标离开事件（不会冒泡）
ondblclick ——————- 双击（单击）事件
```
更多方法参考[http://www.w3school.com.cn/tags/html_ref_eventattributes.asp]()
* 函数中的this

**事件函数里面的this就是指触发这个事件的元素**

```js
<script>
    box.onclick = function(){
       alert( this); //box,本函数是由box触发的
    }
    function fn(){
        //this指向window,因为fn()属于window
        // fn()其实是window.fn();是window让fn执行的
        alert( this );
    }
    fn();
</script>
```
更多关于this的介绍请看后续章节
## 第三章 操作元素属性 CSS样式以及 []的使用
#### cssStyle 操作
* style 对象
* 复合样式改写 background-color ------> backgroundColor
* cssText
* tyle.float的兼容 cssFloat /styleFloat
#### attribute 属性节点
*  获取： getAttribute(名称)

```js
优势:  用.和[]的形式无法操作元素的自定义属性 getAttribute可以操作元素的自定义属性
设置： el.setAttribute(名称, 值)
包含： el.hasAttribute(名称)
删除： el.removeAttribute(名称)
```
#### []的运用
当我们需要使用字符串表示属性的时候，或者此时属性会变化的时候

```js
obj.style.width = '100px';
//可改为
obj.style['width'] = '100px'；
//亦可
var str = 'width'；
obj.style[str] = '100px'
```
## 第四章 javascript数据类型 判断 条件语句
#### javascript数据类型
七大数据类型 Number String Boolean Null Object Undefined **es6新增Symbol**
* number 数字

```js
let num = 123
```
* String 字符串

```js
let str = '只会番茄炒蛋'
```
* Boolean 布尔值

```js
// true / false
let falg = true
```
* Null 空

```js
// 函数表达式
let abc = function(){}

// 函数声明/定义
funticon abc () {}
```
* Object 对象
```js
// (节点对象、自定义对象、array(数组)、json、function、系统对象)
```
* Undefined 未定义
* Symbol
```js
// Symbol是由ES6规范引入的一项新特性，它的功能类似于一种标识唯一性的ID。
```
#### 判断语句
判断语句返回布尔值

```js
    ==  // 判断值
    >   // 大于
    <   // 小于
    <=  // 小于等于
    >=  // 大于等于
    !=  // 不等于
    === // 全等于 除了判断值,还会判断数据类型
    !== // 不全等
```
#### if 条件语句

```js
if ( 条件 ) {
    code // 这是条件 满足时执行的代码
}

// 如果（）括号里面是true则运行{} 中代码
if ( 条件 ) {
    code 1 // 这是条件满足时执行的代码
} else {
    code 2 // 这是条件不满足时执行的代码
}
// 如果（）括号里面是false 则运行 else 大括号中的代码, 总有一个会运行
if ( 条件一 ) {
    code 1 // 这是条件一满足时执行的代码
} else if (条件二) {
    code 2 // 这是条件二满足时执行的代码
} else {
    code 3  // 这是以上两种条件都不满足时执行的代码
}
```
**if () 中的条件会强制转化为布尔值，为false数据: false 0 '' null undefined NaN**
#### 三目运算
三目运算符的语法为conditions ? statementA : statementB ;

```js
let num = 5
num = 5 ? 6 : 5
// 上面这段话的意思就是 num 等于5的话 值就改为6 不等于5的话值改为5
```
#### switch case 条件语句

```js
switch (data) {
    case 1:
        code1 // 执行代码
        break // break 来阻止代码自动地向下一个 case 运行。
    case 2:
        code2 //// 执行代码
        break // break 来阻止代码自动地向下一个 case 运行。
    default:
        与 case 1 和 case 2 不同时执行的代码
}
```
**break break 语句。它用于跳出 switch() 语句，来阻止代码自动地向下一个 case 运行**

**default 关键词来规定匹配不存在时做的事情**
## 第五章 for循环 while后循环 do while前循环
#### for循环
* for () {}循环

```js
for (初始值; 判断条件; 步幅) {
    code // 执行代码
}

for (let i = 0; i < 5; i++) { // i初始值为0；i是否小于5；每次循环后i加1
    console.log(i) // 0 1 2 3 4
}
```
* continue 跳过本次循环

```js
for (let i = 0; i < 5; i++) { // i初始值为0；i是否小于5；每次循环后i加1
    if  (i === 3) {
        continue
    }
    // 因为在i为3的时候跳过了此次循环，所有3没有被打印出来
    console.log(i) // 0 1 2 4
}
```
* break的运用

```js
for (let i = 0; i < 5; i++) { // i初始值为0；i是否小于5；每次循环后i加1
    if  (i === 3) {
          console.log(i) // 3
          break // 跳出中止循环, 提升性能
    }
}
```
#### 变量自增/自减
* i++ 和 i-- **先赋值后自增或者自减**

```js
let a = 20;
let b = a++ // 先把a的值赋值给b, 然后在自增1
console.log(b) // 20
console.log(a) // 21
```
* ++i 和 --i **先自增或者自减后赋值**

```js
let a = 20;
let b = ++a // a的值先自增1, 在赋值给b
console.log(b) // 21
console.log(a) // 21
```
#### while 后循环 do while前循环
* while后循环

```js
while (条件) {
    code // 这里写要执行的代码，条件满足不断执行
}
// 条件满足才会执行code代码
```
* while前循环

```js
do {
    code 1 // code 1会先执行一遍，然后在根据条件决定是否再执行code 1;
} while (条件) {
    code // 这里写要执行的代码，条件满足不断执行
}
```
## 第六章 运算符 类型转换
#### 算术运算

```js
加—————[+]
减—————[-]
乘—————[*]
除—————[ / ]
取模/取余—————[%]
```
* 隐式类型转换

```js
+ 在有字符串的时候,会进行字符串拼接
- * / % 会尽力把不是数字的转化为数字
```
* NaN ———— not a number(不是一个数字)

```js
不是数字的数字类型（number类型）
NaN和自己都不相等
isNaN( obj ) 判断是否为NaN,是返回true,否返回false;
```
* 显示类型转化

**转数字**
```js
Number() 可以用于任何数据类型转换成数值
parseInt()、parseFloat():专门用于把字符串转换成数值都是忽略前导的空格

1) Number()
能把字符串转化为数字。
如果字符串是空的（不包含任何字符），则将其转换为0
如果带非数字的字符串,返回NaN。
undefined,返回NaN。
true和false将分别转换为1和0。
null值，返回0。
var a = Number( '-100.02' );
console.log( a );       // -100.02
var a = Number( '100px' );
console.log( a );       // NaN
var a = Number( '' );
console.log( a );       // 0
var a = Number( undefined );
console.log( a );       // NaN
var a = Number( true );
console.log( a );       // 1
var a = Number( null );
console.log( a );       // 0

2) parseInt() （取整）取 非数字整前的数字 ，或小数点前的数字
3) parseFloat() 能取得小数，第二个小数点前的数字
```
**转字符串**

```js
String( obj );
obj.toString();
```
#### 赋值运算

```js
=  +=  -=  *=  /=  %=  ++  --
```
#### 比较运算

```js
<————–小于
> ————-大于
= = ————- 等于
<= ————-小于等于
>= ————- 大于等于
!= ————- 不等于
= = =————- 全等，除了值的判断，还会进行unicode 编码的对比
!==————-不全等
返回boolean值
```
#### 逻辑运算

```js
|| ———— 逻辑或
&& ———— 逻辑与

赋值操作
let c = a || b // 如果a为true,则用a赋值, 如何a为false,则用b赋值

let c = a && b // 如果a为true,则通过，用 b 赋值,如果a为false,用 a 赋值

布尔值操作
if (a || b) {
    //如果a为true,则为true
    //如果a为false,则看b
}

if (a && b) {
    //如果a为true,则通过，看b,b为true则为true
    //如果a为false,则false
}

取反
if (!obj) {
    // 首先会把obj转化为布尔值，如果 obj是true,则!obj为false
}
```
#### 运算符优先级
JavaScript中的运算符优先级是一套规则。该规则在计算表达式时控制运算符执行的顺序。具有较高优先级的运算符先于较低优先级的运算符执行。

下图按从最高到最低的优先级列出JavaScript运算符。具有相同优先级的运算符按从左至右的顺序求值

![](https://user-gold-cdn.xitu.io/2019/9/14/16d2e21ae804c0eb?w=1284&h=1000&f=png&s=80352)
## 第七章 函数[自执行] [传参] [return] getComputedStyle()
#### 函数自执行
函数自执行方式,即创建立即调用一次
* 函数后面加用小括号,然后在用小括号包起来

```js
(function(){}()) // 函数后面加用小括号,然后在用小括号包起来
```
* 函数用小括号包起来,然后后面加小括号

```js
(function(){})() // 函数用小括号包起来,然后后面加小括号
```
* 函数后面加小括号,然后在函数前面加 + - ~ ！其中的一个符号

```js
+function(){}()
-function(){}()
!function(){}()
~function(){}()
```
#### 函数传参
*  对应传参

形参:即形式参数，是用来接收函数调用时传递过来的数据，命名与变量一致

实参:即真实参数，是给形参传递的具体数据，任何数据类型都可以称为实参
```js
function fn(a, b) { // a,b为形参，且a 为 20，b为10，一一对应
    console.log(a) // 20
    console.log(b) // 10
    console.log(a + b) // 30
}
fn(20, 10) // 20,10为实参
```
*  不定参 arguments

不定参：实参个数不确定
arguments: 是所有实参的集合，arguments是一个类数组，arguments.length 可以返回实参个数
```js
function fn() {
    console.log(arguments) // 返回一个包含实参的类数组
}
fn(20, 10, 5) // 20, 10, 5为实参
```
**关于什么是类数组,请看以后的章节**
#### 函数中的return
* 函数中默认return的返回值为undefined

```js
function fn(a, b) {
    a + b
}
let a = fn(10, 20)
console.log(a) // undefined, 函数如果没有指定返回值,默认返回undefined
```
* 自定义返回值

有时候我们需要函数中返回我们需要的值，这个时候return很有用

```js
function fn(a, b) {
    return a + b
}
let a = fn(10, 20)
console.log(a) // 30 
```
return 返回的数据类型可以是任意类型

```js
function fn(a, b) {
    a +b
    return function () {
        alert('ok')
    }
}
let a = fn(10, 20)
a() // 此时a就是返回的函数, a()打开了一个系统弹窗 
```
return 然后的代码不再执行，整个函数结束

```js
function fn(a, b) {
    a +b
    return function () {
        alert('ok')
    }
    console.log('我不会被打印出来,因为上面有return')
}
fn()
```
#### getComputedStyle()
getComputedStyle(obj,null)[cssStyle]获取计算后的样式对象,只读

```js
<style>
    #elem-container{
    position: absolute;
    left:     100px;
    top:      200px;
    height:   100px;
    }
</style>
<div id="elem-container">dummy</div>
<script>
    let elem = document.getElementById("elem-container");
    let theCSSprop = window.getComputedStyle(elem,null)['left']
    console.log(theCSSprop) // 100px
</script>
```
不要获取复合样式:如background

不要获取未设置的样式: 谷歌是具体宽度, ie是auto

**兼容：ie8及以下 obj.currentStyle[cssStyle]**

```js
if (window.getComputedStyle) {
    return getComputedStyle(obj)[attr]
} else {
    return obj.currentStyle[attr]
}
```
## 第八章 作用域 js预解析 闭包
**作用域** 脚本的有效范围，作用范围。分两大类：全局(script)和局部（function ）
#### 全局(script)域

```js
直接定义在script标签下的变量及函数，他们都作用在一个域，全局作用域，so..
<script>
    var a = 123;
    alert( window.a ); // 123
    function abc(){}
    alert( window.abc ); // function abc(){}
 </script>
```
直接定义在script标签下的变量 称之为全局变量,script标签下的函数，称之为全局函数

全局变量及函数 都是window的一个属性,都能通过window.变量名访问
#### 局部（function ）域
任何一个function(){},都会开启一个局部作用域

定义在function(){} 内部的变量称之为 局部变量
 
作用域链 ：局部作用域内部可以访问父级作用域变量及全局作用域变量，也可以访问父级的函数，及全局函数 ( 往上爬)

```js
let a = 10
function fn() {
    console.loa(a) // 10
}
```
局部变量会覆盖父级（全局）变量，函数亦如此

```js
let a = 10
function fn() {
    let a = 20
    console.loa(a) // 20
}
```
#### javascript解析
javascript解析 即读取代码过程
* javascript解析 是 致上而下
* 预解析:正式解析前的工作，预解析过程会出现 变量提升，函数提升

```js
function () {
    console.log(a) // undefined
    var a = 10
}
```
* 变量提升

在作用域内声明的变量会被提升到作用域的顶部，且对其赋值undefined,这个过程称之为变量提升

```js
上面的列子解析过程为
function() {
    var a = undefined
    console.log(a) // undefined
    var a = 10
}
```
* 函数提升

在作用域内的函数定义函数会被提升到作用域的顶部，其值为其函数本身,这个过程称之为函数提升

```js
function () {
    console.log(fn) // function fn () {}
    function fn () {}
}
```
* var和函数重名函数优先，留下函数，函数和函数重名 后面定义的覆盖前面的-后来居高

```js
console.log(a) // function a() { console.log(a2) }
var a = 10
function a() {
    console.log(a1)
}
function a() {
    console.log(a2)
}
a() // 报错
console.log(a) // 10
```
* 不会提升的函数：在作用域内的函数表达式函数不会被提升到作用域的顶部，so ~
```js
function () {
    console.log(fn) // undefined
    var fn = function () {}
}
```
#### 闭包
* js垃圾回收机制

```js
js 中的 变量 函数 不再使用后，会被自动js垃圾回收机制回收
```
* 形成闭包条件

```js
条件一： 函数内部嵌套函数
条件二： 内部函数引用外部函数的 变量 参数
使用 return 返回了 此内部函数,上面的 变量 和参数 不会被回收

例如:
function fn(x) {
    var a = 5;
    function bibao() {
        var b = a + x
        console.log(x) // 20
        console.log(a) // 5
        console.log(b) // 25
    }
    return bibao
}
var c = fn(20)
console.log(c()) // 20 5 25
```
## 第九章 字符串方法和数组
#### String 字符串
String即文本（字符串），字符串方法都不改原字符串；

创建字符串的三种办法: new String(), String(), 直接量，三种方式创建出来可以创建

```js
var str = new String('hello')

var str = String('hello')

var str = 'hello' // 直接量
```
string.length 属性可以返回字符串长度

string[index] 通过下标获取字符串
#### String方法
* str.concat( str,str...) 字符串拼接
```js
用于把一个或多个字符串连接 到一块，返回拼接好的字符串
```
* str.indexOf(value,index )查找字符串，返回查找字符串首次出现的位置;
```js
方法对大小写敏感！
value 匹配字符
index 开始检索的位置, 合法值是 0 到 string.length - 1,默认0
匹配失败返回-1
```
* str.charAt(index ) 返回指定索引的字符串

```js
var str = 'hello'
console.log(str.charAt(3)) // l
```
* str.charCodeAt(index )返回指定索引的ASCII编码
* str.substring(start,end ) 截取字符串，从start 开始，截止到end前，不包含end

```js
如果没有end则从num开始整个查找
如果 start 比 stop 大，那么该方法在提取子串之前会先交换这两个参数。str.substring(1,4)
```
* str.slice(start,end ) 截取字符串，从start 开始，截止到end前，不包含end
* str.toLocaleUpperCase()/ str.toLocaleLowerCase()
```js
str.toLocaleUpperCase() 把字符串转换为大写。
str.toLocaleLowerCase() 把字符串转换为小写。
```
* str.replace( value/RegExp,new ) 用一些字符替换另一些字符,new可以是字符串，也可以是函数
* str.split(value/RegExp,length-1) 方法用于把一个字符串分割成字符串数组, 返回分割后的数组
* str.search( value/RegExp )返回 检索字符串首次出现的位置;未找到返回-1
* str.match( value/RegExp )``查找指定的值，返回匹配的值。未找到返回null.正则可以找一个或多个表达式

更多字符串方法请见[https://developer.mozilla.org/zh-CN/]()
#### Array 数组
创建数组的三种办法: new Array(), Array(), [] ，三种方式创建出来都是一样的

```js
var arr = new Array()

var arr = Array()

var arr = [] // 直接量
```
* arr.length可以访问数组的长度
* 创建即指定数组长度Array( length )及 new Array( length ),length是 数字的时候，创建的并不是数组的项，而是数组的长度，项的内容为undefined
* [] 通过数组索引，访问值

```js
var arr = [1, 2, 3, 4, 5]
arr[0] // 1
```
* 修改数组指定索引下的值

```js
var arr = [1, 2, 3, 4, 5]
arr[0] = 8888
console.log(arr) // [8888, 2, 3, 4, 5]
```
* 在数组后面添加项

```js
var arr = [1, 2, 3, 4, 5]
arr.length = 8888
console.log(arr) // [1, 2, 3, 4, 5, 8888]
```
* arr.indexOf( item ) 查找项
* 数组去重

利用for循环给数组去除重复项
```js
var arr = [1,2,3,4,5,6,5,4,3,2,1];
var arr2 = []
for (let i = 0; i < arr.length; i++) {
    if (arr2.indexOf(arr[i] == -1)) {
        arr2.push(arr[i])
    }
}
console.log(arr2) // [1, 2, 3, 4, 5, 6]
```
#### Array() 数组方法
* arr.unshift( item1,item1,…. ) 向数组的头部添加一个或更多元素，并返回（新的长度）。
* arr.push( item1,item1,…. ) 向数组的尾部添加一个或更多元素，并返回（新的长度）。
* arr.shift( ) 删除数组的第一个元素（返回删除对象）;。
* arr.pop( ) 删除数组的最后一个元素（返回删除对象）。
* arr.splice(index,howmany,item1,…..,itemX) （删除/添加） 元素，然后（只返回删除对象）。

```js
index 必需。整数，规定添加/删除项目的索引，可以使用负数,如果是添加，原有元素会往高位移动。
howmany 必需。要删除的项目数量。如果设置为 0，则不会删除项目。
item1, ..., itemX可选。向数组添加的新项目。
```
* arr.sort() 排序

```js
默认arr.sort() 以首字符编码大小排序
数组length小于10以冒泡排序
冒泡排序下依次比较，
return > 0 调换位置，= 0不调换位置，< 0 不调换位置
数组length大于10以二分排序
```
* arr.reverse() 反转数组

**以上方法不创建新的数组，而是直接修改原有的数组,同时索引会变化**

**以下方法会创建出一个新的数组, 而不是直接修改原数组**
* arr.concat() 数组拼接

```js
该数组是通过把所有 arrX 参数添加到 arr 中生成的。
如果要进行 concat() 操作的参数是数组，那么添加的是数组中的元素，而不是数组 ——不修改原数组
```
* arr.slice() 截取

```js
arr.slice(start,end)方法从已有的数组中返回选定的元素
```
* arr.join() 拼接成字符串
* Array.isArray( ) 判断是不是数组
##### ECMAscript5 的遍历数组方法

```js
以下下方法都能实现遍历，语法也都一样，只是返回值不一样—————————————不修改原数组
array.xxxx( function(currentValue,index,arr ), thisValue )
参数 描述
currentValue ———————必须。当前元素的值
index ——————————–可选。当期元素的索引值
arr————————————可选。当期元素属于的数组对象
thisValue ————————–可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。
如果省略了 thisValue ，”this” 的值为 “undefined”

function(currentValue, index,arr) 必须。函数，数组中的每个元素都会执行这个函数
```
* forEach()

```js
arr.forEach() 从头至尾遍历数组 ——————————————————————————–无返回值
```
* map() 返回值数组

```js
arr.map() 返回一个数组，包含函数所有返回值—————————————————————-返回数组
var arr = [1, 2, 3, 4]
var newArr = arr.map(function(x){
    return x * x
})
console.log(newArr) // [1, 4, 9, 16]
```
* filter() true数组

```js
arr.filter() 返回值是一个 return 值为true或能转化为true的值——————————————–返回数组
var arr = [1, 2, 3, 4]
var newArr = arr.filter(item => {
    return item > 3
})
console.log(newArr) // [4]
```
* every()

```js
arr.every() 针对所有元素，即都为true 则返回true———————————————————————————–返回值
var  arr = [1,2,3,4];
var newArr = arr.every(item => {return item < 5}); 
console.log(newArr) // true, 因为数组的每一项都小于5

var newArr = arr.every(item => {return item < 3}); 
console.log(newArr) // false, 因为数组中的某一项不小于3
```
* some()

```js
arr.some() 是否存在 即有一个是true则为true———————————————————————————–返回值
var  arr = [1,2,3,4];
var newArr = arr.some(item => {return item % 2 === 0});
console.log(newArr) // true, 因为有偶数存在
```
## 第十章 对象(JSON ) for/in function[all apply bind]
#### JSON
* 创建对象（JSON）
对象是Javascript的基本数据结构，对象是引用类型
创建对象的三种方式 对象直接量，new Oject(), Object.create({})[ ES5 ],create创建需要一个对象参数

```js
// 对象都是一个key(键):value( 值 )一一对应

var obj = {} // 直接量
var obj = new Object()
var obj = Object.create()
```
* 访问JSON的值

obj.attribute 和 obj[attribute]

```js
var obj = {
    age: 20,
    name: '番茄炒蛋',
    sex: '男'
}
console.log(obj.age) // 20
console.log(obj[age]) // 20
```
* 修改JSON的属性值

```js
var obj = {
    name: '番茄炒蛋'
}
obj.name = '只会番茄炒蛋'
```
* 添加JSON属性

```js
var obj = {
    name: '番茄炒蛋'
}
obj.age = 20
```
* 删除JSON属性

```js
var obj = {
    name: '番茄炒蛋',
    age: 20
}
delete obj.name 或者 delete obj[name]
```
* JSON数字属性

```js
var obj = {
    name: '番茄炒蛋',
    age: 20
}
obj[1] = 'hello'
obj[2] = 'word'
```
* in 判断对象是否存在某个属性

```js
var obj = {
    name: '番茄炒蛋',
    age: 20
}
console.log('age' in obj) // true
```
#### for in遍历json
* for in 遍历JSON
```js
var obj = {
    name: '番茄炒蛋',
    age: 20
}
for (let attr in obj) { //attr 为属性，attr不是必须的，可以为任意变量名
    console.log(attr) // 属性名 name age
    console.log(obj[attr]) // 对应的属性值 '番茄炒蛋' 20
}
```
* for in 也可以遍历数组

```js
var arr = [1, 2, 3, 4]

for (let attr in arr) { //attr 为属性，attr不是必须的，可以为任意变量名
    console.log(attr) // 下标
    console.log(obj[attr]) // 对应下标的值 1 2 3 4
}
```
**for循环不能遍历JSON**
#### JSON对象仿jQuery 链式操作 css html

```js
function $ (option) {
    var t = typeOf option
    if (t == 'function') {
        window.onload = option
    } else if (t.toLowerCase() == 'string') {
        var ele = option.subString(1, option.length)
        el = document.getElementById(ele)
    }
    var obj = {
        css: function (attr, val) {
            el.style[attr] = val
            return obj;
        },
        html: function (val) {
            el.innerHTML = val
            return obj
        }
    }
    return obj
}
$('#box').css('backgroundColor','red').html('hello');
```
#### JSON.parse() 对象化 / JSON.stringify() 对象字符化
* JSON.parse()
JSON.parse(obj )方法解析一个JSON字符串，构造由字符串描述的JavaScript值或对象。可以提供可选的reviver函数以在返回之前对所得到的对象执行变换。

```js
var obj = '{
    "name": "只会番茄炒蛋",
    "age": 10,
    "sex": "男"
}'

JSON.parse(obj)
// 解析后的值为: 
obj = {
    name: "只会番茄炒蛋",
    age: 10,
    sex: "男"
}
```
* JSON.stringify()
JSON.stringify( obj )与JSON.parse()进行的是反操作

```js
JSON.stringify({});                     // '{}'
JSON.stringify(true);                   // 'true'
JSON.stringify("foo");                  // '"foo"'
JSON.stringify([1, "false", false]);    // '[1,"false",false]'
JSON.stringify({ x: 5 });               // '{"x":5}'
JSON.stringify({x: 5, y: 6});           // "{"x":5,"y":6}"
```
#### Function call() applay() bind()方法
* call()和apply都用于函数调用

```js
function fn () {
    console.log(this)
}
fn() // window
fn.call('hello') // String {"hello"}
fn.call(123) // Number {123}
```
**区别**

call( thisvalue, val1，val2，….)
```js
// thisvalue 是函数内部this的值
// 后面是参数列表
```
apply( thisvalue, [val1，val2，….])

```js
// thisvalue 是函数内部this的值
// 后面是参数数组，所有参数放数组里面
```
* bind()都用于创建中

```js
1) 适用于匿名函数
var fn = function (a, b) {
    console.log(this, a, b)
}.bind('hello', 1, 2)
fn() // String {"hello"} 1 2

2)有名函数,有些特殊
function fn() {
    console.log(this)
}
fn.bind('hello')() // String {"hello"}

3)自执行函数
(function fn() {
    console.log(this)
}.bind('hello')())  // String {"hello"}

(function fn() {
    console.log(this)
}.bind('hello'))() // String {"hello"}

(function fn() {
    console.log(this)
}).bind('hello')() // String {"hello"}
```
## 第十一章 定时器 Math函数
#### 定时器
* setInterval()

setInterval(function(){}, 1000) 多用于动画

第一个参数是一个函数

第二个参数是事件, 表示1秒(1000毫秒)后调用一次, 然后每个1秒调用执行一次第一个函数里面的内容

```js
1) 一般使用
var a = 0;
setInterval(function () {
    a++;
    console.log(a) // 每隔一秒打印a 并且a在自增
}, 1000)

var a = 0;
function fn() {
    a++;
    console.log(a)
}
setInterval(fn, 1000)  // 和上面的写法数据一样

2)第一个参数fn 与 fn()的区别, fn()会不等延迟直接调用, 后面不在调用
var a = 0;
function fn() {
    a++;
    console.log(a)
}
setInterval(fn(), 1000)  // 1 打印1,然后就不在调用

3) 带return值的fn
var a = 0;
function fn() {
    a++;
    console.log(a)
    return function(){console.log('ok')}
}
setInterval(fn(), 1000) // 1 打印1,然后就不在调用
```
* clearInterval() 清除定时器

```js
clearInterval(timerManger) 里面的参数是定时管理器
var timer = setInterval(function(){}, 1000) // 设置变量timer为定时管理器
clearInterval(timer) // 清除timer定时管理器
```
* setTimeout() 一次定时器

setTimeout( function(){},1000 )

第一个参数是一个函数

第二参数是时间，表示1秒（1000毫秒）后调用一次，然后不再调用

```js
var a = 0;
setTimeout(function () {
    a++;
    console.log(a) // 1 只有一次打印
})
```
* clearTimeout() 清除定时器

```js
clearTimeout(timerManger) 里面的参数是定时管理器
var timer = clearTimeout(function(){}, 1000) // 设置变量timer为定时管理器
clearTimeout(timer) // 清除timer定时管理器
```
#### Math 数字函数
Math对象用于执行数学任务 Math对象 无需new，直接调用Math方法就行
* Math.random() 求随机值 左闭右开区间

```js
// 随机 0~1之间的数
var rand = Math.random()
console.log(rand) // 0~1之间的数

// 随机 5~10之间的数
var rand =  Math.random() *(10-5) + 5; 
console.log(rand) // 5~10之间的数

// 封装随机x至y之间的数
function random(x, y) {
    var rand = x + Math.random() * (y - x)
    return rand
}
```
* Math.round()————四舍五入

```js
var num = 12.6
Math.round(num) // 13

var num = 12.3
Math.round(num) // 12
```
*  Math.ceil() ————向上取整 (上舍入)
*  Math.floor()————向下取整 (下舍入)
*  Math.abs()—————求绝对值
*  Math.pow(x,y)———–x的y次幂（x的y次方）
*  Math.sqrt(x) —————返回数的平方根
*  Math.max(x,y,z...)——-求x和y的最大值
*  Math.min(x,y,z...)——-求x和y的最小值
#### Math方法二
“度”的定义是，“两条射线从圆心向圆周射出，形成一个夹角和夹角正对的一段弧。当这段弧长正好等于圆周长的360分之一时，两条射线的夹角的大小为1度。（如图1）
弧度的定义是：两条射线从圆心向圆周射出，形成一个夹角和夹角正对的一段弧。当这段弧长正好等于圆的半径时，两条射线的夹角大小为1弧度。

![](https://user-gold-cdn.xitu.io/2019/9/16/16d3908370ee8c2d?w=588&h=349&f=png&s=96954)
角所对的弧长是半径的几倍，那么角的大小就是几弧度。

它们的关系可用下式表示和计算：

( 弧度 )＝ 弧长 / 半径

圆的周长是半径的 2π倍，所以一个周角（360度）是 2π弧度。
* 度跟弧度之间的换算

```js
据上所述，一个平角是 π 弧度。
即 180度＝π弧度
由此可知：
弧度＝π/180度 ( ≈0.017453弧度 )
```
* Math.sin（弧度） 正弦 对边比斜边 一个以弧度表示的角
* Math.cos（弧度）余弦 邻边比斜边 是 -1.0 到 1.0 之间的数
* Math.PI

```js
Math.PI 即π 是圆的周长和它的直径之比。这个值近似为 3.141592653589793
一弧度 = π/180；将角度乘以（2PI/360） 0.017453293 即可转换为弧度
```
## 第十二章 日期对象Date
#### 日期
* new Date() 本地时间

```js
var d = new Date()
console.log(d) // Mon Sep 16 2019 15:48:31 GMT+0800 (中国标准时间)
```
* toUTCString() 当前 世界时

toUTCString() 根据世界时，把 Date 对象转换为字符串。
```js
var d = new Date();
var utc =  d.toUTCString()
console.log(ytc) // "Mon, 16 Sep 2019 07:48:31 GMT"
```
* 获取具体时间

```js
getFullYear()       // 年
getMonth()          // 月( 0 ~ 11 )
getDate()           // 天( 1 ~ 31 )
getDay()            // 星期( 0 ~ 6 )
getHours()          // 时
getMinutes()        // 分
getSeconds()        // 秒
getMilliseconds()   // 毫秒
getTime()           // 返回 1970 年 1 月 1 日至今的毫秒数
```
#### 日期格式化
var date = new Date()
* date.toLocaleString() ——————–按照本地时间输出
* date.toLocaleDateString() —————本地时间 年 月 日
* date.toLocaleTimeString() ————–本地时间 时 分 秒
* date.toTimeString()————————本地 时 分 秒 时区
* date.UTC() ————————————世界时返回 1970 年 1 月 1 日 到指定日期的毫秒数

**更多方法参考[http://www.w3school.com.cn/tags/html_ref_eventattributes.asp]()**
## 第十四章 动画运动
requestAnimationFrame()

当然最原始的你还可以使用window.setTimout()或者window.setInterval()通过不断更新元素的状态位置等来实现动画，前提是画面的更新频率要达到每秒60次才能让肉眼看到流畅的动画效果。
现在又多了一种实现动画的方案，那就是window.requestAnimationFrame()方法。
* 基本使用方式

```js
var num = 0;
function fn() {
    num++;
    document.title = num;
    requestAnimationFrame(fn) //在内部根据用户浏览器(电脑性能)情况,重复调用 fn
}
fn() // 页面不断变化,数字自增
```
* cancelRequestAnimationFrame( timer ) 添加manager定时管理器

```js
var num = 0;
var timer;
function fn() {
    num++;
    document.title = num;
    timer = requestAnimationFrame(fn) //在内部根据用户浏览器(电脑性能)情况,重复调用 fn
    if (num == 250) {
        cancelAnimationFrame( timer ); // 清除停止运动
    }
}
fn() // 页面不断变化,数字自增
```
把 requestAnimationFrame(fn) 赋值给 timer，timer 就是定时管理器
* RequestAnimationFrame( )兼容

```js
// RequestAnimationFrame的兼容
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (fn){
    setTimeout(fn,1000/60)
}

// cancelAnimationFrame 兼容
window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCanceltAnimationFrame ||
window.webkitCancelAnimationFrame || window.msCancelAnimationFrame || clearTimeout;
```
#### 速度版运动框架

```js
<style>
    #elem-container{
    position: absolute;
    left:     100px;
    top:      200px;
    height:   100px;
    }
</style>
<div id="elem-container">dummy</div>
<script>
    let ele = document.getElementById("elem-container");
    let theCSSprop = window.getComputedStyle(ele,null)['left']
    console.log(theCSSprop) // 100px
    
    move(ele, 'left', 20, -6) // 调用move函数, 指定传递实参 目标标签/更改的属性/目标值/步长
    function move(ele, attr, target, speed) { // 指定接受形参 目标标签/更改的属性/目标值/步长
        target = parseFloat(target) // 转化为number
        var initCss = parseFloat(getStyle(ele, attr)) // 获取初始样式值
        var timer; // 动画管理器
        (function requ() {
            initCss += speed
            timer = requestAnimationFrame(requ) // 调用reque函数
            if (Math.abs(target-init) <= Math.abs(speed)) { // 用绝对值判断是否到达目标值
                initCss = target
                cancelAnimationFrame(timer); // 删除requestAnimationFrame动画
            }
            ele.style[attr] = initCss + 'px';//设置样式
        })()
    } 
    
    //定义获取样式函数
    function getStyle(ele, attr) {
        // 处理好兼容
        return window.getComputedStyle ? window.getComputedStyle(obj)[attr] : obj.currentStyle[attr];
    }
</script>
```
#### 时间版运动框架

```js
<style>
    #elem-container{
    position: absolute;
    left:     100px;
    top:      200px;
    height:   100px;
    }
</style>
<div id="elem-container">dummy</div>
<script>
    let ele = document.getElementById("elem-container");
    let theCSSprop = window.getComputedStyle(ele,null)['left']
    console.log(theCSSprop) // 100px
    
    move(ele, 'left', '800px', 1000) // 调用move函数, 指定传递实参 目标标签/更改的属性/目标值/时间
    function move(ele, attr, target, target_t) { // 指定接受形参 目标标签/更改的属性/目标值/时间
        target = parseFloat(target) // 转化为number
        var initCss = parseFloat(getStyle(ele, attr)) // 获取初始样式值
        var initTime = new Date() // 获取开始时间
        var styleValue;
        (function requ() {
            var cur_t = new Date() - initTime // 获取动画时长
            var prop = cur_t / target_t
            if (prop >= 1) { // 动画执行时长与动画预设总时间比值大于等于1时
                prop = 1
            } else {
                window.requestAnimationFram(requ)
            }
            styleValue = (target - initCss) * prop // 根据时间比例获取运动路程比例
            ele.style[attr] = initCss + styleValue + 'px'; // 设置样式
        })()
    } 
    
    //定义获取样式函数
    function getStyle(ele, attr) {
        // 处理好兼容
        return window.getComputedStyle ? window.getComputedStyle(obj)[attr] : obj.currentStyle[attr];
    }
</script>
```
#### 时间加速版运动框架
加速度

例：假如两辆汽车开始静止，均匀地加速后，达到10m/s的速度，A车花了10s，而B车只用了5s。它们的速度都从0变为10m/s，速度改变了10m/s。所以它们的速度变化量是一样的。但是很明显，B车变化得更快一些。我们用加速度来描述这个现象：B车的加速度（a=Δv/Δt，其中的Δv是速度变化量）>A车的加速度。
显然，当速度变化量一样的时候，花时间较少的B车，加速度更大。也就是说B车的启动性能相对A车好一些。因此，加速度是表示物体速度变化快慢的物理量。

S是距离，Vf终速度，t是加速的时间。Vf=at，a是加速度，替换可得这是匀加速运动距离的通常表达式

![](https://user-gold-cdn.xitu.io/2019/9/17/16d3cb5026d217e4?w=393&h=205&f=png&s=5142)

```js
move(Obox, 'left', '800px', 1500); // 调用move函数,指定传递实参
fucntion move(obj,attr,target,tar_t) { // 指定接受形参
  target = parseFloat(target); // 转化为number  
  var init = parseFloat( getStyle(obj,attr)); // 获取初始样式值
  var init_time = new Date(); // 获取开始时间
  var sty_v;
  var a = 2 * (target-init) / Math.pow(tar_t,8); // 获取加速度
  (function requ() {
      var cur_t = new Date()- init_time; // 获取动画时长
      if( cur_t >= tar_t ){//动画执行时长与动画预设总时间比值大于等于1时,
          cur_t = tar_t;
      } else {
          window.requestAnimationFrame(rQAF);
      }
      sty_v = a * Math.pow(cur_t,8) / 2;//根据时间比例获取运动路程比例
      obj.style[attr] = init+ sty_v + 'px';//设置样式
  })()
}

//定义获取样式函数
function getStyle(ele, attr) {
    // 处理好兼容
    return window.getComputedStyle ? window.getComputedStyle(obj)[attr] : obj.currentStyle[attr];
}
```
#### 多值时间版运动框架

```js
move(obox, {
    width: '200px',
    height: '200px',
    left: '800px',
    opacity: 1
}, 2000, function(){console.log('已经达到目标值')}) // 调用move函数,指定传递实参

function move(obj,json,targ_t,callback){    //指定接受形参
    var target = {} // 目标值
    init ={},       // 初始值
    styleV;         // 样式
    for (var attr in json) {
        target[attr] = parseFloat(json[attr]) // 将目标值转为number类型
        init[attr] = parseFloat( getStyle(obj,attr) ) // 获取初始样式值并转化为number类型
    }
    var init_t = new Date(); // 获取开始时间
    (function rQAF(){
        var cur_t = new Date()-init_t; // 获取当前时间与开始时间的差值--动画执行时长
        if( cur_t>=targ_t){ // 判断动画执行时长是否大于预设目标
            cur_t=targ_t; // 让动画执行时长等于预设目标
        } else {
            window.requestAnimationFrame(rQAF); // 调用rQAF函数一次
        }
        for (var attr in json) {
            var a = 2 * (target[attr] - init[attr]) / Math.pow(targ_t,2); // 获取对象属性的加速度
            styleV = a * Math.pow(cur_t,2) / 2; // 根据动画时长设置样式
            if(attr == 'opacity'){
                obj.style[attr] = init[attr] + styleV;//设置样式
                obj.style.filter = 'alpha(opacity = ' + styleV * 100 + ')'; // opacity兼容
            } else {
                obj.style[attr] = init[attr] + styleV + 'px';//设置样式
            }
        }
        // 根据动画时长是否等于了预设目标，true执行回调函数，并绑定this
        cur_t == targ_t ? callback && callback.call(obj) : '';
    })()
}

//定义获取样式函数
function getStyle(ele, attr) {
    // 处理好兼容
    return window.getComputedStyle ? window.getComputedStyle(obj)[attr] : obj.currentStyle[attr];
}
```
原生的动画运动大致就以上这几种, 如果自己能力强的话建议自己搞一个库出来, 没有这个时间或者懒得弄的话, github上一堆成熟的库供你使用。
## 第十五章 DOM文档对象模型
DOM(Document Object Model) 文档树对象模型
#### 节点属性
* childNodes \ children

```js
Ele.childNodes ————————–子节点集合
元素.childNodes : 只读 属性 子节点列表集合
标准下： 包含了文本和元素类型的节点，也会包含非法嵌套的子节点
非标准下：只包含元素类型的节点，ie7以下不会包含非法嵌套子节点
childNodes 只包含一级子节点，不包含后辈孙级

ele.children————————– 获取第一级子元素
nodeType : 只读 属性 当前元素的节点类型 共12种
    元素节点
    属性节点: wrap.attributes[0].nodeType
    文本节点
nodeName 节点名称

元素节点属性
    ele.tagName 元素标签名称
    有关属性节点操作:
        获取 ： obj.getAttributeNode() 方法获取指定的属性节点。
        创建 ： document.createAttribute(name) 创建拥有指定名称的属性节点，并返回新的 Attr 对象。
        添加 ： obj.setAttributeNode() 方法向元素中添加指定的属性节点。
```
* firstChild \ firstElementChild 第一个子节点

```js
ele.firstChild : 只读 属性
标准下：firstChild会包含文本类型的节点
非标准下：只包含元素节点

ele.firstElementChild : 只读 属性 标准下获取第一个元素类型的子节点
非标准下：无
```
* lastChild \ lastElementChild —————————————————最后一个子节点

```js
兼容性同上
```
* nextSibling \ nextElementSibling ——————————————下一个兄弟节点
* 
```js
兼容性同上
```
* previousSibling \ previousElementSibling ——————————-上一个兄弟节点
```js
兼容性同上
```
* parentNode———————————————————————获取父节点
* offsetParent ——————————————————————最近定位父级
* childElementCount  ———————————————————子元素节点个数

```js
元素类型子节点数量，等同于 children.length
```
#### 创建节点

* document.createElement('') 创建元素节点
```js
innerHTML += 添加元素的问题，原本子元素没有了，不是原本的元素了
```
* document.createTextNode(str) 创建文本节点
* element.cloneNode() 参数true克隆元素及后代不会克隆属性及事件，false克隆本元素
#### 元素节点操作
* parent.insertBefore(new, node) 在已有元素前插入
```js
插入子元素 ,在指定的子元素前面插入
```
* parent.appendChild(new) 在已有元素后插入
```js
插入插入子元素，在指定的子元素前面插入
例子：留言板插入内容
```
* parent.removeChild(节点)删除一个节点

```js
删除DOM元素
```
* parent.replaceChild(new, old)替换节点

```js
换元素
```
## CSSOM视图模式(CSS Object Model View)
文档及其内容的视觉属性，包括布局框定位、视区宽度和元素滚动
#### Window视图属性
* innerWidth/innerHeight

```js
window.innerWidth window窗口的内部宽度，
不包括用户界面元素，比如窗框
window.innerHeight内部高度
```
#### Document文档视图
* document.documentElement.clientWidth

```js
document.documentElement.clientWidth==>浏览器窗口可视宽度
document.documentElement.clientHeight==>浏览器窗口可视高度
====》 可获取文档没有内容时候高度
没有定义W3C的标准，则 IE为：
document.documentElement.clientWidth ==> 0
document.documentElement.clientHeight ==> 0
```
#### 元素视图属性
* clientWidth/ clientHeight 可视宽高

```js
clientWidth对象的——————–width + padding
clientHeight 对象的——————height + padding
==> 不包含子元素（一致）
```
* offsetWidth/ offsetHeight 可视宽高

```js
offsetHeight:对象height + padding + border
offsetWidth: 对象width + padding + border
==> 不包含子元素（一致）
```
* scrollWidth/ scrollHeight 可视宽高

```js
scrollWidth对象的width + padding
scrollHeight应该等用于scrollTop + clientHeight
如果元素没有隐藏的部分，则相关的值应该等用于clientWidth和clientHeight
scrollHeight对象的height + padding
==> 包含子元素内容,子元素定位,overflow:hidden`（一致）
```
* offsetParent 定位父级

```js
获取元素最近的定位父级 如果没有定位父级 则参考body（ 元素必须是定位元素）
```
* offsetTop/offsetLeft

```js
offsetLeft:获取对象相对于offsetParent(left)位置
offsetTop:获取对象相对于offsetParent(top)位置
```
* scrollTop/scrollLeft 滚动宽,滚动高

```js
可读可写，有内容溢出元素才有效果
ele.scrollTop 元素Y轴滚动的距离
ele.scrollLeft 元素X轴滚动的距离
设置时不能给px 单位，否则会出错！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
document.getElementsByTagName("body")[0].scrollTop = 100;
```
* document.body.scrollTop/ scrollLeft

```js
网页被卷去的高： document.body.scrollTop
网页被卷去的左： document.body.scrollLeft
 IE, firfox：document.documentElement.scrollTop ! ! ! ! ! ! ! ! ! ! ! ! ! !
```
#### 元素方法
* getBoundingClientRect():
```js
getBoundingClientRect():得到矩形元素的界线，返回的是一个对象，
包含 top, left, right, bottom四个属性值，大小都是相对于浏览器窗口top,left 的距离。
返回内容类似于：
{ top: 143, right: 1196, bottom: 164, left: 889}
```
* scrollIntoView():
```js
ele.scrollIntoView() 让元素滚动到可视区域（HTML5标准),参数 true 与浏览器对齐，false元素在窗口居中显示
```
* event.clientX/event.clientY

```js
相对于window，为鼠标相对于浏览器窗口的偏移
event.clientX 鼠标在文档的水平座标
event.clientY 鼠标在文档的垂直座标
```
## BOM对象
浏览器对象模型 (BOM) 使 JavaScript 有能力与浏览器“对话”。

```js
Window 对象 它表示浏览器窗口。
所有 JavaScript 全局对象、函数以及变量均自动成为 window 对象的成员。
全局变量是 window 对象的属性。
全局函数是 window 对象的方法。
HTML DOM 的 document 也是 window 对象的属性之一
window.document.getElementById("header");
```
#### Window 对象属性
* document Document 对象
* location 浏览器地址信息

```js
Location 对象属性:
对象属性	                    描述
window.location.href	    设置或返回完整的 URL。
window.location.search      设置或返回 url?,?+后面的内容。
window.location. hash	    设置或返回 url#后面的内容
window.location.port	    设置或返回当前 URL 的端口号。
window.location.hostname    设置或返回当前 URL 的主机名。
window.location.host	    设置或返回主机名和当前 URL 的端口号
window.location.pathname    设置或返回当前 URL 的路径部分
window.location.protocol    设置或返回当前 URL 的协议
```
* history 历史记录

History 对象包含用户（在浏览器窗口中）访问过的 URL。
```js
属性
length 返回浏览器历史列表中的 URL 数量。
方法
back() 加载 history 列表中的前一个 URL。
forward() 加载 history 列表中的下一个 URL。
go() 加载 history 列表中的某个具体页面。
下面一行代码执行的操作与单击两次后退按钮执行的操作一样：
history.go(-2)
```
* Navigator 对 Navigator 对象的只读引用

```js
window.`navigator.userAgent` 浏览器信息
```
#### Window 对象方法
*  open() 打开一个新的浏览器窗口或查找一个已命名的窗口。
```js
window.open(url,target)
open(地址默认是空白页面，打开方式默认新窗口) 打开一个新窗口
window.open('http://www.baidu.com', '_self');
var opener = window.open();//返回值 返回的新开页面的window对象
opener.document.body.style.background = 'red';
window.close()
opener.close();//可以通过关闭用window.open方法打开的窗口
```
*  close() 关闭浏览器窗口。
*  setInterval() 按照指定的周期（以毫秒计）来调用函数或计算表达式。
*  setTimeout() 在指定的毫秒数后调用函数或计算表达式。
*  clearInterval() 取消由 setInterval() 设置的 timeout。
*  clearTimeout() 取消由 setTimeout() 方法设置的 timeout。
*  scrollTo() 把内容滚动到指定的坐标。
```js
document.onclick = function(){
    window.scrollTo(0,500);
}
```
* scrollBy()
```js
scrollBy(xnum,ynum) 指定的像素值来滚动内容。不带px
xnum 必需。把文档向右滚动的像素数 。
ynum 必需。把文档向下滚动的像素数。
document.onclick = function(){
    window.scrollTo(0,500);
}
```
* alert( 内容 ) 警告框
```js
alert( 内容 )``警告框经常用于弹出警告信息，无返回值
```
* confirm(“文本”) 确认框
```js
confirm(“文本”)``确认框用于使用户可以验证或者接受某些信息。
如果用户点击确认，那么返回值为 true。如果用户点击取消，那么返回值为 false。
```
* prompt(“文本”,”默认值”)

```js
prompt(“提示”,”默认值”)提示框经常用于提示用户在进入页面前输入某个值。
如果用户点击确认，那么返回输入的值。如果用户点击取消，那么返回值为 null。
function disp_prompt(){
    var name=prompt("请输入您的名字","Bill")
    if (name!=null && name!=""){
        document.write("你好！" + name + " 今天过得怎么样？")
    }
}
```
####  window对象常用事件
* onload 文档加载完毕
* onscroll 滚动的时候
* onresize 调整尺寸的时候
## 第十六章 event对象 阻止冒泡 注册/ 移除监听事件
#### 事件event对象
Event对象
用来获取事件的详细信息：鼠标位置、键盘按键

**兼容**

```js
标准下 : 事件对象是通过事件函数的第一个参数
传入 如果一个函数是被事件调用的那么，这个函数定义的第一个参数就是事件对象
ie: event是一个内置全局对象

var obj.onclick = function (ev) {
    var ev = ev || window.event;
}

Event对象的兼容：ev = ev || window.event;
Event对象下的获取鼠标位置：e.clientX || e.clientY
```
#### 事件冒泡
事件冒泡指子元素触发事件的时候，会 冒泡（触发）父级的相同的事件

```js
阻止冒泡:
    非标准：ev.stopPopagation();
    非标准：ev.cancelBubble = true;
```
#### 注册处理事件
* 标准：obj.addEventListener(事件名称，事件函数，是否捕获);

```js
是否捕获
false冒泡
true捕获
先捕获后冒泡
有捕获
事件名称没有on
事件执行的顺序是正序
this触发该事件的对象
```
* 低版ie：obj.attachEvent(事件名称，事件函数);
```js
没有捕获
事件名称有on
事件函数执行的顺序：标准ie-》正序 非标准ie-》倒序
this指向window
```
* 移除 obj.removeEventListener(事件名称，事件函数)
* 移除 object.detachEvent(事件名称,function);
#### 拖拽
* onmousedown 鼠标按下
* onmousemove 鼠标移动
* onmouseup   鼠标抬起
#### 默认事件
右键菜单 : oncontextmenu

```js
解决：文字选中再的问题
标准：解决办法 return false (阻止默认事件)
非标准ie：全局捕获
onselectstart = "return false"` 处理文字选中
ondragstart = "return false" 处理图片拖动
```
**标准下阻止默认事件，可以拖拽图片啦**
#### 鼠标滚轮事件

```js
Ie/chrome: onmousewheel
event.wheelDelta
上：120
下：-120
firefox : DOMMouseScroll 必须用addEventListener()添加

fire: event.detail
上：-3
下：3
滚轮属性：event.wheelDelta \ event.detail
```
**兼容**

```js
obj.onmousewheel = handle; // 兼容ie chrome
obj.addEventListener ? obj.addEventListener('DOMMouseScroll', handle,boolean) : false;   // 兼容firefox

// 滚动函数event对象处理
function handle(e){
    e = e || window.event;
    e.wheel = e.wheelDelta ? e.wheelDelta : -e.detail * 40;
}
```
**阻止默认事件：**

```js
标准：event.preventDefault()
非标准：event.returnValue = false;

return false阻止的是 obj.on事件名称=fn 所触发的默认行为
addEventListener绑定的事件需要通过event下面的event.preventDefault();
detachEvent绑定的事件需要通过event下面的event.returnValue = false;
鼠标滚轮与自定义滚动条结合
```
#### 全兼容添加/删除事件 封装

```js
function addEvent(obj, type, fn, boolean){
    boolean = boolean || false; // 处理捕获冒泡
    obj[type + fn.name] = handle;//添加方法
    obj.addEventListener ? obj.addEventListener(type, obj[type+fn.name], boolean) :
    obj.attachEvent('on'+type,obj[type+fn.name]);
    // 滚轮事件
    if(type == 'mousewheel'){
        // obj['on'+type]= handle; // chrome 及ie
        //兼容火狐
        obj.addEventListener ? obj.addEventListener('DOMMouseScroll', obj[type+fn.name], boolean) : '';
    }
    // 处理event对象
    function handle(e){
        e = e|| window.event;
        e.wheel = e.wheelDelta?e.wheelDelta:e.detail*(-40); // 处理滚轮方向
        fn.call(obj,e);
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
    }
}

function removeEvent(obj,type,fn,boolean){
    boolean = boolean || false; // 处理捕获冒泡
    obj.removeEventListener ? obj.removeEventListener(type, obj[type+fn.name], boolean) :
    obj.detachEvent('on'+type,obj[type+fn.name]);
    // 滚轮事件
    if (type == 'mousewheel') {
        //兼容火狐
        obj.removeEventListener ? obj.removeEventListener('DOMMouseScroll', obj[type+fn.name], boolean) : '';
    }
}
```
## 第十七章 表单事件 事件委托 onready封装 键盘事件
#### 表单中的操作
 焦点事件 
 * onfocus 获取焦点事件 input、textarea 以及 select 和 a 元素
 * onblur 获取焦点事件 input、textarea 以及 select 和 a 元素
 * onchange 内容改变触发 input、textarea 以及 select 元素
 * onsubmit 事件 表单提交时间
 * onreset 事件  重置表单
```js
obj.focus() 给指定的元素设置焦点
```
####  事件委托
标准：e.target 指向事件触发对象

非标准：e.srcElement 指向事件触发对象
#### window.onready

```js
文档的onreadystatechange 事件
当文档的readyState 属性发生变化的时候触发
readyState 属性返回当前文档的状态（载入中……）。
该属性返回以下值:
uninitialized - 还未开始载入
loading - 载入中
interactive - 已加载，文档与用户可以开始交互
complete - 载入完成
```
#### 键盘事件
不是所有元素都能够接收键盘事件，能够响应用户输入的元素，能够接收焦点的元素就能够接收键盘事件,document能够响应

```js
keydown：用户在键盘上按下某按键是发生。一直按着某按键则会不断触发（opera浏览器除外）。
keypress：用户按下一个按键，并产生一个字符时发生（也就是不管类似shift、alt、ctrl之类的键，
就是说用户按了一个能在屏幕上输出字符的按键keypress事件才会触发）。一直按着某按键则会不断触发。
keyup：用户释放某一个按键是触发。

event.keyCode : 数字类型 键盘按键的值 键值
ctrlKey,shiftKey,altKey 布尔值

当一个事件发生的时候，如果ctrl || shift || alt 是按下的状态，返回true，否则返回false
```
第十八章 RegExp
#### 什么是正则表达式
```js
正则表达式是描述字符模式的对象。

正则表达式用于对字符串模式匹配及检索替换，是对字符串执行模式匹配的强大工具。
而String和RegExp都定义了使用正则表达式进行强大的模式匹配和文本检索与替换的函数。
正则表达式主要用来验证客户端的输入数据。可以节约大量的服务器端的系统资源，并且提供更好的用户体验。
```
#### 创建正则表达式
* 直接量

```js
语法：Reg = /pattern/modifiers;

var Reg = /box/gi;
```
* new RegExp

```js
语法 Reg = new RegExp( pattern , modifiers ); // pattern, modifiers此时是字符串
var Reg = new RegExp(“box”, ”gi”);

何种方法创建都是一样的
pattern 模式 模板，要匹配的内容
modifiers 修饰符
```
#### 正则表达式用法及区别
* String中正则表达式方法

```js
方法	                描述
match(Reg)	        返回RegExp匹配的包含全部字符串的数组或null
search(Reg)	        返回RegExp匹配字符串首次出现的位置
replace(Reg，newStr)	用newStr替换RegExp匹配结果，并返回新字符串
split(Reg)	        返回字符串按指定RegExp拆分的数组

例子:
var str = 'hello';
var Reg = /e/i;
str.match(Reg);
```
* RegExp对象的方法

```js
方法    	描述
exec（）	在字符串中执行匹配搜索，返回首次匹配结果数组,
test（）	在字符串中测试模式匹配，返回true或false

例子:
var pattern = new RegExp(“box”,”gi”);
pattern.test(str);
pattern.exec(str);
```
**注意区别正则方法和字符串方法使用避免混淆**

```js
正则方法：pattern.test(str); 方法的主体是正则表达式
字符串方法：str.match(pattern);方法的主体是字符串
```
#### 修饰符
修饰符用于执行区分大小写和全局匹配:
* i 忽略大小写匹配
* g 全局匹配，默认只匹配第一个元素，就不在进行匹配
* m 执行多行匹配

```js
例子: 
var patt =  /pattern/i;         //忽略大小写匹配
var patt =  /pattern/g;         //全局匹配
var patt =  /pattern/m;         //执行多行匹配
```
#### pattern 模式
* 基本匹配

```js
xxx ———————————匹配xxx字符
var Reg = /abc/;

x|y|z —————————-匹配x或y或z字符
var Reg = /abc|bac|cba/;
```
* []

```js
[abc]———————————–匹配abc之中的任何一个字符

非
[^abc]———————————匹配非a非b非c字符的

到
[0-9] ———————————匹配0至9之间的数字
[a-z] ———————————匹配小写a至小写z的字符
[A-Z] ———————————匹配大写A至大写Z的字符
[\u4e00-\u9fa5]———匹配中文 

还可以组合
var Reg  = /hello [0-9a-zA-z]/;
```
* 元字符(转义字符)

```js
. —————————————–匹配单个字符，除了换行和行结束符
\w—————————————匹配单词字符,数字,_(下划线)
\W—————————————匹配非（单词字符和_(下划线)）
\d —————————————匹配数字
\D —————————————匹配非数字
\s —————————————匹配空白字符（空格）
\S —————————————匹配非空格字符
\b —————————————匹配单词边界 ( 除了 （字)字母 数字_ 都算单词边界)
\B —————————————匹配非单词边界
\n —————————————匹配换行符

特殊的转译字符. \ /

1.var reg = /\./;//匹配.
2.var reg = /\\/;//匹配\
3.var reg = /\//;//匹配/
```
#### 量词

```js
n?———————————匹配0个或一个n的字符串
n*———————————匹配0个或多个字符串(任意个)
n+———————————匹配至少一个n字符串
n{X}——————————匹配包含X个n的序列的字符串
n{X,Y}————————–匹配包含至少X或至多Y个n的序列的字符串
n{x,}—————————-匹配至少X个n的序列字符串

^n———————————匹配以n开头的字符串
n$———————————匹配以n结尾的字符串
```
#### 贪 婪 惰 性

```js
贪婪: 尽可能多的匹配
惰性: 尽可能少的匹配
前提条件都是要匹配到内容

—— 贪 婪 ——	—— 惰 性 ——
+	            +?
?	            ??
*	            *?
{n}	            {n}?
{n,m}	            {n,m}?
{n,}                {n,}?

```
#### 子组(子表达式)

```js
子组:使用()小括号,指定一个子表达式后,称之为分组
捕获型
非捕获型
```
* 捕获型
```js
1.var str = 'abcdefg';
2.var reg = /(abc)d/;//匹配abcd
3.var val = reg.exec( str);
4.console.log( val );   //["abcd", "abc", index: 0, input: "abcdefg"]

索引0 为匹配的结果
索引1 为第一个子表达式 匹配结果
index :首次匹配成功的索引值，
input: 匹配目标


—— 字符 ——		引用
(pattern)	匹配pattern并捕获结果，自动设置组号,是从1开始的正整数	\num
引用是值的引用，匹配结果的引用不是匹配形式引用
```
* 非捕获型

```js
(？:pattern)
(?=pattern) 零宽度正向预言
1.Windows (?=2000) //匹配windows且后面跟2000
匹配 “Windows2000” 中的 “Windows”
不匹配 “Windows3.1” 中的 “Windows”。

(?!pattern) 零宽度负向预言
1. Windows (?!2000)//匹配windows且后面非2000
匹配 “Windows3.1” 中的 “Windows”
不匹配 “Windows2000” 中的 “Windows”。
```
**说实话正则我搞的很头大, 一般都是用到什么网上去搜, 自己写还要去看笔记...**
## 第十八章 cookie

```js
cookie : 存储数据，当用户访问了某个网站（网页）的时候，我们就可以通过cookie来向访问者电脑上存储数据

1.不同的浏览器存放的cookie位置不一样，也是不能通用的
2.cookie的存储是以域名形式进行区分的
3.cookie的数据可以设置名字的
4.一个域名下存放的cookie的个数是有限制的，不同的浏览器存放的个数不一样
5.每个cookie存放的内容大小也是有限制的，不同的浏览器存放大小不一样
```
* 访问cookie

```js
要在服务器环境下我们通过document.cookie来获取当前网站下的cookie的时候，
得到的字符串形式的值，他包含了当前网站下所有的cookie。他会把所有的cookie通过一个分号+空格的形式串联起来
console.log( document.cookie );
```
* 存储cookie

```js
document.cookie = '数据名=值';
```
* 设置cookie过期时间

```js
cookie默认是临时存储的，当浏览器关闭进程的时候自动销毁,
如果我们想长时间存放一个cookie。需要在设置这个cookie的时候同时给他设置一个过期的时间

过期时间必须是一个日期对象转换成的字符串（时间戳.toGMTString()）
document.cookie = ‘数据名=值; expires=过期时间’;

例如:
var oDate = new Date();
oDate.setDate( oDate.getDate() + 5);
oDate.toGMTString();//转换为日期字符串
document.cookie='age=20; expires='+oDate;
```
* cookie封装

```js
// 设置cookie封装
function setCookie(obj, time) {
    for (key in obj) {
        var d = new Date();
        d.setDate( d.getDate() + time );
        document.cookie = key + '=' + obj[key] +'; expires = ' + d.toUTCString();
    }
}
setCookie({
    name:'hello',
    sex:'man',
    love:'逛街',
}, 5)

// 获取cookie封装
function getCookie() {
    var cookie = document.cookie;
    var result = {};
    for(key in arguments){
        var val = '\\b'+arguments[key]+'=(\\w*)+';
        var reg =new RegExp(val,'i');
        val = reg.exec(cookie);
        result[arguments[key]] = val? decodeURI(val[1]):null;
    }
    return result;
}
getCookie('age', 'name')

// 移除Cookie
function removeCookie() {
    for(key in arguments){
        var json ={};
        json[arguments[key]]=null;
        setCookie(json,-1);
    }
}
removeCookie('name');
```
## 第十九章 脚本化HTTP Ajax
#### Ajax概述

```js
AJAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）。
功能：在不刷新页面的情况下，实现与后台的数据交互

AJAX 不是新的编程语言，而是一种使用现有标准的新方法。
Ajax技术核心是XMLHttpRequest对象(简称XHR)

1 运行在服务器
2 不能跨域
```
#### XMLHttpRequest 对象方法
* 创建XMLHttpRequest 对象

```js
创建 new XMLHttpRequest()
ie 6以下版本new ActiveXObject('Msxml2.XMLHttp.3.0') 或 new ActiveXObject('Msxml2.XMLHTTP.6.0')
例如: 
new XMLHttpRequest() || new ActiveXObject('Msxml2.XMLHTTP.3.0')||new ActiveXObject('Msxml2.XMLHTTP.6.0'); 
```
* Open(``method,url,asynch,[username],[password])

```js
指定和服务器端交互的HTTP方法，URL地址，即其他请求信息；
Method: http请求方法，一般使用”GET“,”POST“.
url： 请求的服务器的地址；
asynch： 是否采用异步方法，true为异步，false为同步；
后边两个可以不指定，username和password分别表示用户名和密码，提供http认证机制需要的用户名和密码。

// GET
GET请求是最常见的请求类型，最常用于向服务器查询某些信息。
必要时，可以将查询字符串参数追加到URL的末尾，以便提交给服务器。
xhr.open('get', 'demo.php?rand=' + Math.random() + '&name=Koo', true);

注意: 特殊字符(eg:&等)，传参产生的问题可以使用encodeURIComponent()进行编码处理，中文字符的返回及传参，
可以将页面保存和设置为utf-8格式即可。或者使用提交url通用方法。

// POST
POST请求可以包含非常多的数据，我们在使用表单提交的时候，很多就是使用的POST传输方式。
xhr.open(‘post’, ‘demo.php’, true);
而发送POST请求的数据，不会跟在URL的尾巴上，而是通过send()方法向服务器提交数据。
xhr.send(‘name=Lee&age=100’);
一般来说，向服务器发送POST请求由于解析机制的原因，需要进行特别的处理。
因为POST请求和Web表单提交是不同的，需要使用XHR来模仿表单提交。

例如:
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
```
* SetRequestHeader(String header,String Value)如果是POST方式，需要设置请求头

```js
设置HTTP请求中的指定头部header的值为value.
此方法需在open方法以后调用，一般在post方式中使用。

xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
```
* send(data)

```js
向服务器发出请求，如果采用异步方式，该方法会立即返回。
content可以指定为null表示不发送数据，其内容可以是DOM对象，输入流或字符串。
```
* Abort()

```js
停止当前http请求。对应的XMLHttpRequest对象会复位到未初始化的状态。
```
#### XMLHttpRequest对象属性
* onreadystatechange

```js
请求状态改变的事件触发器（readyState变化时会调用这个属性上注册的javascript函数）。
```
* readyState

```js
表示XMLHttpRequest对象的状态：
0：未初始化。对象已创建，未调用open；
1：open方法成功调用，但Send方法未调用；
2：send方法已经调用，尚未开始接受数据；
3：正在接受数据。Http响应头信息已经接受，但尚未接收完成；
4：完成，即响应数据接受完成。
```
* responseText | responseXML

```js
responseText 服务器响应的文本内容
responseXML 服务器响应的XML内容对应的DOM对象
```
* Status

```js
服务器返回的http状态码。
200表示“成功”，
404表示“未找到”，
500表示“服务器内部错误”等。

通过xhr.getResponseHeader(“Content-Type”);可以获取单个响应头信息
getAllResponseHeaders();获取整个响应头信息
console.log(xhr.getAllResponseHeaders())
```
## 第二十章 Ajax封装 跨域 jsonp
#### Ajax封装

```js
function ajax(obj) {
    var type = obj.type || 'GET' // 请求类型
    url = obj.url // url处理
    asyn = obj.asyn !== true // 异步处理
    data = '' // 预设写入数据
    dataType = obj.dataType  || 'json' // 数据类型
    success = obj.success, // 回调函数
    error = obj.error; // 错误处理函数
    for(key in obj.data){ // 数据处理
        data += key+'='+obj.data[key]+'&';
    }
    data = encodeURI(data);
    var xhr=new XMLHttpRequest();
    if(window.XMLHttpRequest){ // 处理兼容
        xhr = new XMLHttpRequest();
    } else {
        try{
            xhr = new ActiveXObject('Msxml2.XMLHTTP.6.0');
        } catch(e) {
            xhr = new ActiveXObject('Msxml2.XMLHTTP.3.0');
        }
    }
    //如果是GET请求方式,设置数据
    if(type.toUpperCase() == 'GET'){
        var date = new Date().getTime();//添加一个时间用来处理，GET方式缓存的问题
        url = url+'?'+data+date;
        data = null;
    } else if (dataType.toUpperCase() == 'XML') {
        data =null;
    }
    xhr.open(type,url,asny); // 请求架设
    xhr.setRequestHeader('content-Type','application/x-www-form-urlencoded'); // 设置请求头信息
    xhr.send(data); // 发送数据
    xhr.onreadystatechange= function(){ // 监听请求
        // readyState 为XMLHttpRequest对象的状态
        // status 为服务器返回的http状态码
        if(xhr.readyState== 4 && xhr.status==200){
            var response;
            if(dataType === 'json' || dataType === 'text'){
                if(dataType === 'json'){
                    // 解析json数据
                    response = JSON.parse(xhr.responseText);
                } else {
                    // 普通数据
                    response = xhr.responseText;
                }
            } else {
                response = xhr.responseXML;
            }
             success&&success(response);
        } else {
            error && error(xhr.status);
        }
    }
}
```
#### 跨域
iframe 跨域 // 用的超级少了

json 跨域

```js
jsonp,大家已经知道json是什么了，那么p是什么？p是填充的意思,json的填充
jsonp返回的数据形式是 callback({age:30,name:'二狗'})
而不是{age:30,name:'二狗'}是用括号包裹,前面的名称就是‘填充’，也就是jsonp的p.
为什么前面有一段字母呢？因为script接受的数据如果是一个json没办法保存，
而调用一个函数,{}数据作为实参传递,这样就可以拿到json中的数据
```
jsonp前端代码看起来像这样

```js
<script>
    function callback(data){ // 定义接收数据的处理函数
        console.log( data);
    }
</script>
//我需要后台返回一个callback({数据})这样的一个值，实质就是调用上面的函数
<script src='./8-1jsonp.php?jsonp=callback'></script>
```
## 第二十一章 面向对象OOP ECMAscrtipt5
####  ECMAScript 对象类型

```js
在 ECMAScript 中，所有对象并非同等创建的。
一般来说，可以创建并使用的对象有三种：本地对象、内置对象和宿主对象 、自定义对象。

本地对象包括：
1.Object 
2.Function 
3.Array 
4.String 
5.Boolean 
6.Number 
7.Date 
8.RegExp 
9.Error 
10.EvalError 
11.RangeError 
12.ReferenceError 
13.SyntaxError 
14.TypeError 
15.URIError 

内置对象：
1.ECMA-262 只定义了两个内置对象，即 Global（window） 和 Math （它们也是本地对象，根据定义，每个内置对象都是本地对象）。

宿主对象:
1.所有非本地对象都是宿主对象（host object），即由 ECMAScript 实现的宿主环境提供的对象。
2.所有 BOM 和 DOM 对象都是宿主对象。
```
#### 对象中this指向，谁调用指向谁

```js
var obj = {
    show: function () {
        console.log(this)
    },
    name: {
        getName: function () {
            console.log(this)
        }
    }
}
obj.show(); // 指向obj
obj.name.getname(); // 指向name
```
#### ECMAScript5 对象的属性方法
* 对象属性

```js
constructor
对创建对象的函数的引用（指针）。对于 Object 对象，该指针指向原始的 Object() 函数。
```
* 对象方法

```js
1) hasOwnProperty(property)
obj.hasOwnProperty(name)来判断一个属性是否是自有属性，自身属性还是继承原型属性。必须用字符串指定该属性。返回true 或 false

2) isPrototypeOf(object)
obj.isPrototypeOf( obj.prototype ) 判断该对象的原型是否为xxxxx。 返回true 或 false

3) propertyIsEnumerable()
obj.propertyIsEnumerable(‘name’) 判断对象给定的属性是否可枚举，即是否可用 for...in 语句遍历到,返回true 或 false

4)getter,setter: 返回property的值得方法，值：function(){}或 undefined 默认是undefined

5)__defineGetter__(),__defineSetter__() 定义setter getter 函数
在对象定义后给对象添加getter或setter方法要通过两个特殊的方法__defineGetter__和__defineSetter__。
这两个函数要求第一个是getter或setter的名称，以string给出，第二个参数是作为getter或setter的函数。

6)__lookupGetter__,__lookupSetter__ 返回getter setter所定义的函数
语法：obj.lookupGetter(sprop)
```
#### ECMAScript5 Object的新属性方法
* Object.defineProperty(O,Prop,descriptor) / Object.defineProperties(O,descriptors)

```js
定义对象属性
O ——————————–为已有对象
Prop —————————为属性
descriptor —————–为属性描述符
descriptors —————-多个属性描述符？
在之前的JavaScript中对象字段是对象属性，是一个键值对，而在ECMAScript5中引入property，property有几个特征
Object.defineProperty 及Object.defineProperties 定义默认为:

value：值，默认是undefined

writable：是否可写，默认是false,

enumerable：是否可以被枚举(for in)，默认false

configurable：是否可以被删除，默认false
```
* Object.getOwnPropertyDescriptor(O,property)
```js
获取对象的自有的指定的属性描述符
```
* Object.keys(O,property)

```js
获取所有的可枚举的属性名，非继承,返回数组
```
* Object.getOwnPropertyNames(O)

```js
获取所有自有的属性名，非继承
```
* Object.create(O, descriptors )

```js
Object.create(O,descriptors)这个方法用于创建一个对象，并把其prototype属性赋值为第一个参数，
同时可以设置多个descriptors ，第二个参数为可选，
```
* Object.preventExtensions(O) / Object.isExtensible()

```js
Object.preventExtensions(O) 阻止对象拓展，即：不能增加新的属性，但是属性的值仍然可以更改，也可以把属性删除，
Object.isExtensible(O)用于判断对象是否可拓展
```
* Object.seal(O) / Object.isSealed()

```js
Object.seal(O)方法用于把对象密封，也就是让对象既不可以拓展也不可以删除属性
（把每个属性的configurable设为false）,单数属性值仍然可以修改，Object.isSealed（）由于判断对象是否被密封
```
* Object.freeze(O) / Object.isFrozen()

```js
终极神器，完全冻结对象，在seal的基础上，属性值也不可以修改（每个属性的wirtable也被设为false）
```
**说实话这章节的内容很多东西我在开发中根本用不到,极少数能用一下的...除非用到了我才会看看笔记**
## 第二十二章面向对象 OOP 继承
#### 包装对象

```js
原始值类型(值类型): Boolean Number String
原始值.包装 = "包装对象"
包装对象: 字面量定义的原始类型的对象, 临时创建了一个对象, 这个对象就叫做包装对象,包装对象使用完就丢弃了

1) 字面量创建的对象, 原理是js在内部隐式调用对应的构造函数生成的对象,
如果是有js机制隐式调用了构造函数创建的原始类型对象, 那么创建完成后,会把对象丢弃了

2) 如果认为显示的调用构造函数生成原始类型的对象, 那么不会把对象丢弃了(可以进行属性的写入和读取)

var arr = '123'  typeof(arr === String)
var str = new String('123') typeof(str === Object)
console.log(arr == str) 使用对象实际上使用对象的值, 所以相等
console.log(arr === str) 严格模式是不全等的, 不单单判断值相同,还要判断类型相同
```
#### 继承

```js
继承: 子类继承父类
    1) 子类可以继承父类的所有
    2) 子类扩展不能影响父类
类继承的缺点: 不能在子类实例化时传参数
私有属性继承: 父类.call(this, 参数)
```