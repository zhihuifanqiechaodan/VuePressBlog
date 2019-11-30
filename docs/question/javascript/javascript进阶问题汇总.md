# JavaScript进阶问题汇总
作为一枚前端工程师, JavaScript基础一定是重中之重, 市面上主流框架虽然不断在更新迭代, 但是只要我们原生js基础打的好, 任何框架学起来也只是时间的问题, 因此我会逐步的梳理原生js的知识, 巩固复习加深印象和了解。

## 第一篇: JS数据类型之问——概念篇

### JS原生数据类型有哪些? 引用数据类型有哪些?
```js
// 在js中存在 8 种数据类型
// 7种值类型
* Boolean
* String
* Number
* undefinde
* BigInt
* Symbol
* null

// 1种引用类型
* Object
引用数据类型: 
对象Object（包含普通对象-Object，数组对象-Array，正则对象-RegExp，日期对象-Date，数学函数-Math，函数对象-Function）
```
### 说出下面运行的结果，解释原因。

```js
function test(person) {
  person.age = 26
  person = {
    name: 'hzj',
    age: 18
  }
  return person
}
const p1 = {
  name: 'fyq',
  age: 19
}
const p2 = test(p1)
console.log(p1) // p1：{name: “fyq”, age: 26}
console.log(p2) // p2：{name: “hzj”, age: 18}
```
原因: 在函数传参的时候传递的是对象在堆中的内存地址值，test函数中的实参person是p1对象的内存地址，通过调用person.age = 26确实改变了p1的值，但随后person变成了另一块内存空间的地址，并且在最后将这另外一份内存空间的地址返回，赋给了p2。

### null是对象么? 为什么?
```js
结论: null不是对象。
```
解释: 虽然 typeof null 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象然而 null 表示为全零，所以将它错误的判断为 object 。

### '1'.toString()为什么可以调用?
其实在这个语句运行的过程中做了这样几件事情：
```js
var s = new Object('1');
s.toString();
s = null;
```
第一步: 创建Object类实例。注意为什么不是String ？ 由于Symbol和BigInt的出现，对它们调用new都会报错，目前ES6规范也不建议用new来创建基本类型的包装类。
第二步: 调用实例方法。
第三步: 执行完方法立即销毁这个实例。
整个过程体现了基本包装类型的性质，而基本包装类型恰恰属于基本数据类型，包括Boolean, Number和String。

### 0.1+0.2为什么不等于0.3？
0.1和0.2在转换成二进制后会无限循环，由于标准位数的限制后面多余的位数会被截掉，此时就已经出现了精度的损失，相加后因浮点数小数位的限制而截断的二进制数字在转换为十进制就会变成0.30000000000000004

### 为什么需要BigInt?
在JS中，所有的数字都以双精度64位浮点格式表示，那这会带来什么问题呢？
这导致JS中的Number无法精确表示非常大的整数，它会将非常大的整数四舍五入，确切地说，JS中的Number类型只能安全地表示-9007199254740991(-(2^53-1))和9007199254740991（(2^53-1)），任何超出此范围的整数值都可能失去精度

## 第二篇: JS数据类型之问——检测篇

### typeof是否能正确判断类型?
对于原始类型来说, 除了null 以为typeof都可以正确的显示类型
```js
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
```
但是对于引用类型, 除了函数之外, 都会显示Object
```js
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
```
因此采用typeof判断对象数据类型是不合适的，采用instanceof会更好，instanceof的原理是基于原型链的查询，只要处于原型链中，判断永远为true
```js
const Person = function() {}
const p1 = new Person()
p1 instanceof Person // true

var str1 = 'hello world'
str1 instanceof String // false

var str2 = new String('hello world')
str2 instanceof String // true
```