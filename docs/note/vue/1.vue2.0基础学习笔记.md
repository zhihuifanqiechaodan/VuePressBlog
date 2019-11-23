[Vue入门指南(快速上手vue)](https://juejin.im/post/5c9f22876fb9a05e425556ed)

该篇文章的讲解能能够带你快速入门vue,尽可能多的讲解vue中的各个知识点,让你能够快速上手使用vue发开你的第
一个项目, 当然已经学习使用了vue的同学可以查漏补缺,看看那些是自己学习但长时间不用已经忘记的
## 为什么要学习vue
通过学习Vue提供的指令, 很方便的就能把数据渲染到页面上, 不在需要手动操作DOM元素, 前端的Vue之类的框架, 不提倡手动操作DOM元素。
### 什么是MVVM模式
MVVM 是Model-View-ViewModel 的缩写，它是一种基于前端开发的架构模式，其核心是提供对View 和 ViewModel 的双向数据绑定，这使得ViewModel 的状态改变可以自动传递给 View，即所谓的数据双向绑定。

```js
其中 M 层 是vue中的data, V层是el绑定的HTML元素, VM是new实例的vue
```
## 第一章 创建vue实例 
我们在页面中通过script标签引入我们需要的vue
```js
<script src="https://cdn.jsdelivr.net/npm/vue"></script>

<div id="app">
  {{ message }}  // 通过差值表达式的方式将数据渲染到页面
</div>
var VM = new Vue({
  el: '#app', // 表示当我们new的这个Vue实例, 要控制页面上的那个区域
  data: { // data属性中，存放的是el中要用到的数据,这里的data就是MVVM中的M专门用来保存每个页面的数据
    message: 'Hello Vue!'
  },
  methods : {}, // 这个methods属性中定义了当前Vue实例所有可用的方法,主要写业务逻辑
  computed: {}, // 在computed中,可以定一些属性, 这些属性叫做计算属性,计算属性的本质就是一个方法,只不过我们在使用这些计算属性的时候是吧它们的名称直接当做属性来使用的,并不会把计算属性当做方法去调用
  filters : {}, // 这个filters属性中定义了当前Vue实例中所有可用的过滤的方法 
  watch: {}, // 使用这个属性,可以监听data中数据的变化,然后触发这个watch中对应的function处理函数
  router, // 挂载路由对象
  directives：{}, // 这个directives属性定义了当前Vue实例中所有可用的自定义指令
  beforeCreate () {}, // 生命周期函数: 表示实例完全被创建之前,会执行这个函数
  created () {}, // 生命周期函数: 表示实例被创建之后
  beforeMounted () {}, // 生命周期函数: 表示模板已经编译完成,但是还没有把模板渲染到页面中
  mounted () {}, // 生命周期函数:表示模板已经编译完成,内存中的模板已经真实的渲染到了页面中去,已经可以看到渲染好的页面了
  beforeUpdate () {}, // 生命周期函数: 表示当前界面还没有被更新,数据肯定被更新了
  update () {}, // 生命周期函数: 表示当前页面和数据保持同步了,都是最新的
  beforeDestroy () {}, // 生命周期函数: 表示Vue实例已经从运行阶段进入到销毁阶段
  destroyed () {} // 生命周期函数: 表示组件已经完全被销毁了
})
```
## 第二章 自定义全局和局部指令
自定义指令在我们的项目中很常用, 所以要认真学习。
### 第一部分: 使用Vue.directive()自定义全局的指令
**注意 :** 参数 1 是指令的名称, 在自定义指令的时候, 指令的名称前面不需要加 "v-"前缀

**注意 :** 参数 2 是一个对象, 对象身上有一些指令的相关函数, 这些函数可以在特定的阶段,
执行相关的操作句号

**注意 :** 在参数 2 中的相关函数中,第一个参数，永远是el,表示被绑定了指令的那个元素，这个el参数，是一个原生的js对象

**注意 :** 在参数 2 中的相关函数中,都有一个binding参数，是一个对象，它包含以下属性：name/指令名，value/指令的绑定值（例如v-mydirective="'red'"）值就为red，剩下的属性去看官网用的少
同样导入vue, 创建VM实例对象

```js
<script src="https://cdn.jsdelivr.net/npm/vue"></script>

<div id="app">
  {{ message }}  // 通过差值表达式的方式将数据渲染到页面
</div>
var VM = new Vue({
    el: '#app', // 表示当我们new的这个Vue实例, 要控制页面上的那个区域
    data: { // data属性中存放的是el中要用到的数据,这里的data就是MVVM中的M专门用来保存每个页面的数据
        message: 'Hello Vue!'
    },
})
// 自定义指令方法：
Vue.directive(“指令名称”，{ 
    bind: function(){}, 
    inserted: function(){}, 
    updata: function(){} 
})
```
**自定义指令中的bind函数** 

每当指令绑定到元素上的之后，会立即执行这个bind函数，只执行一次

**注意 :** 和样式相关的操作，一般都可以在bind执行，只要通过指令绑定了元素，不管这个元素有没有被插入到页面中去，这个元素肯定有了一个内联样式。

将来元素肯定会显示页面中去，这时候，浏览器的渲染引擎必然会解析样式，应用给这个元素

**注意 :** 在元素干绑定了指令的时候，还没有插入到DOM中去，这时候调用例如：el.focus（获取焦点）等js行为相关的操作，需要在inserted方法中去执行，防止js行为不生效

因为一个元素, 只有在插入DOM之后, 才能操作他的js行为

```js
// 举例
Vue.directive(“color”，{ 
    bind: function(el, binding){
        //这个指令绑定的样式颜色是固定死的，我们可以通过指令的绑定值来动态改变样式颜色
        el.style.color ="red" 
    }, 
})
// 需要注意: 指令绑定的值如果不是字符串而是一个变量，就需要你在data中定义这个变量的值
// 下面展示通过使用指令传入的颜色来来定义绑定标签的颜色
<p v-color=" 'red' "></p> 
定义指令：Vue.directive(" color ",{ 
    bind: function(el, binding){ 
        el.style.color = binding.value 
    } 
})
// 在自定义局部指令的时候, 我们也可以通过给v-color绑定一个变量, 通过动态改变变量的值来控制标签的颜色 
```
**自定义指令中的inserted函数** 

表示元素插入到DOM中的时候会执行inserted函数（触发一次）

**注意 :** 和js行为相关的操作，需要在inserted方法中去执行，防止js行为不生效


```js
// 例如: 
<p v-color=" 'red' "></p> 
定义指令：Vue.directive(" color ",{ 
    bind: function(el, binding){ 
        el.style.color = binding.value // 设置绑定该指令的标签颜色
    },
    inserted: function(el, binding){ 
        el.focus()  // 在这里执行获取焦点才管用
    } 
})
```
**自定义指令中的updata函数**

当组件更新的时候, 会执行updata函数, 可能会多次触发
### 第二部分: 使用Vue.directive()自定义全局的指令

使用方法和上面的全局指令一样。只是自定义局部指令需要在VM实例中定义

```js
例如:
<script src="https://cdn.jsdelivr.net/npm/vue"></script>

<div id="app">
  {{ message }}  // 通过差值表达式的方式将数据渲染到页面
</div>
var VM = new Vue({
    el: '#app', // 表示当我们new的这个Vue实例, 要控制页面上的那个区域
    data: { // data属性中存放的是el中要用到的数据,这里的data就是MVVM中的M专门用来保存每个页面的数据
        message: 'Hello Vue!'
    },
    // 自定义局部指令
    directives: {
        "color":{
           bind: function(){}, 
           inserted: function(){}, 
           updata: function(){} 
        }
        // 下面这个是简写方式: 简写的function等同于把代码写到了bind和updata函数中
        color: function(el, binding) {
            el.style.color = binding.value
        }
    }
})

```
## 第三章 vue官方提供的指令
vue官方为我们提供了很多它自己原生的指令, 工作项目中会经常用到,这里我先为大家讲解几个基础的指令

### v-cloak指令
使用v-cloak指令能够解决差值表达式闪烁的问题

```js
// 需要在样式中设置以下样式
<style>
    [v-cloak] {
        display: none;
    }
</style>

// 使用方式: 在我们使用差值表达式的标签添加该指令
<p v-cloak>{{ msg }}</p>
```
### v-text指令
v-text 是没有闪烁的问题
但是 v-text 会覆盖元素中原本的内容，但是差值表达式只会替换自己的这个占位符，不会把整个元素的内容清空

```js
使用方式:
<p v-text>{{ msg }}</p>
```
### v-html指令
v-html 会解析标签，以上两种不会，它也会更改元素中原本的内容

```js
使用方式：
new app({
    el: "#app",
    data: {
        msg: "<h1>我是一个标签元素</h1>"
    }
})
<p v-html="msg"></p>
```
### v-bind指令
* v-bind： 是Vue中，提供的用来绑定属性的指令,只能实现数据的单向绑定,从M自动绑定到V,无法实现数据的双向绑定。
* 注意：v-bind： 指令可以被简写为 ：要绑定的属性
* v-bind 中可以写合法的js表达式

```js
// 使用方式:
<p v-bind:title="msg"></p>

简写方式:
<p :title="msg"></p>

// 属性中写js表达式
<p v-bind:title="msg+'合法表达式'"></p>

```
#### 绑定class属性的用法
* 数组的写法
```js
// 直接传递一个数组, 数组里面的类名要写字符串, 注意:这里的class需要使用v-bind做数据绑定
使用方式：
<p :class="['thin', 'italic']"></p>
```
* 数组中嵌套对象

```js
// 数组中推荐使用这种方式
使用方式：
<p :class="['thin', 'italic',{'active':flag}]"></p> // 这里的flag在data中定义, 是一个布尔值
```
* 数组中使用三元表达式

```js
// data中定义一个布尔值类型的flag,在数组中用三元表示来显示这个flag
使用方式：
<p :class="['thin', 'italic', flag ? 'active':'noactive']"></p>
```
* 直接使用对象

```js
// 在为class使用v-bind绑定对象的时候,对象的属性是类型,
// 由于对象的属性可带可不带引号,写法自己决定, 属性的值是一个标识符
使用方式: 
<p :class="{thin: true, italic: true, active: false}"></p>
```
#### 绑定style属性的用法
* 直接在标签上通过 :style 的形式书写

```js
// 对象就是无序键值对的集合
使用方式：
<p :style="{color:'red', 'font-weight':200}"></p>
```
* 将样式定义在data中, 在:style绑定的标签中引用

```js
// 先将样式定义在data中的一个变量身上
new app({
    el: "#app",
    data: {
        styleObject: {color:'red', 'font-weight':200}
    }
})
// 在标签上,通过属性绑定的形式,将样式对象应用到元素中
<p :style="styleObject"></p>
```
* 在 :style 中通过数组, 引用多个 data 上的样式对象

```js
// 先将样式定义在data中的一个变量身上
new app({
    el: "#app",
    data: {
        styleObject1: {color:'red', 'font-weight':200},
        styleObject2: {color:'red', 'font-weight':200}
    }
})
// 在标签上,通过属性绑定的形式,将样式对象应用到元素中
使用方式：
<p :style="[styleObject1, styleObject2]"></p>
```
### v-model指令

Vue中唯一一个实现双向数据绑定的指令, **注意 : 只能运用到表单元素中**

```js
使用方式:
<input v-model="msg"></input> // 修改imput输入框的值, 下面p标签绑定的内容会随之改变
<p>{{ msg }}</p>
```
### v-for指令
* 在使用 v-for 指令的时候**要注意加上 key 属性**

* Vue2.2以后的版本规定,当前组件使用v-for循环的时候, 或者在一些特殊情况中, 如果v-for有问题, 必须在使用v-for的同时, 指定唯一的字符串/数组类型 :key值。

* v-for="(val, key) in list" // **in 后面可以放普通数组, 对象数组, 对象, 还可以放数字**
#### 迭代数组

```js
// 先在data上定义一个数组
new app({
    el: "#app",
    data: {
        list: [1, 2, 3, 4]
    }
})
使用方式：item是循环的每一项,list是循环的数组,index是索引值
<li v-for="(item, index)in list" :key="index">{{index}}~~~{{item}}</li>
```
#### 迭代对象数组

```js
new app({
    el: "#app",
    data: {
        list:[{id:1,name:'tank1'}, {id:2,name:'tank2'}, {id:3,name:'tank3'}]
    }
})
使用方式：
<li v-for="(item, index)in list" :key="index">
  id:{{item.id}} --- 名字:{{item.name}} --- 索引{{index}}
</li>
```
#### 迭代对象

```js
new app({
    el: "#app",
    data: {
        list: {
            name1: "abc1",
            name2: "abc2",
            name3: "abc3"
        }
    }
})
使用方式：在遍历对象身上的键值对的时候.除了有val、key, 在第三个位置还有一个索引index, 索引基本用不到
<li v-for="(val, key, index) in list" :key="index">
    值是:{{ val }} --- 键是: {{key}} --- 索引{{index}}
</li>
```
#### 迭代数字
如果使用v-for迭代数字,前面的 count 从 1 开始

```js
使用方式：
<li v-for="(count, index) in 10" :key="index">这是第 {{count}} 次循环</li>
```
### v-if 和 v-else 和 v-else-if 还有 v-show指令
如果元素涉及到频繁的切换,最好不要使用 v-if 而推荐使用 v-show

如果元素可能不太频繁被显示出来被用户看,推荐用 v-if 和 v-else
* v-if 和 v-else

```js
// v-if 的特点: 每次都会重新删除或创建元素
// v-if 有较高的切换性能消耗
// v-else 元素必须紧跟在带 v-if 或者 v-else-if 的元素的后面，否则它将不会被识别。
使用方式：
new app({
    el: "#app",
    data: {
        flag: true // 定义一个变量为布尔值类型
    }
})
<p v-if="flag">我在flag为true的时候显示</p>  
<p v-else>我在flag不为true的时候显示</p>
```
* v-show

```js
// v-show的特点: 每次不会重新进行DOM的删除和创建,只是切换了元素的display:none样式
// v-show有较高的初始渲染消耗
使用方式：
<p v-show="flag">我在flag为true的时候显示</p>
```
## 第四章 事件机制和事件/按键修饰符和过滤器及监听属性
绑定事件监听器。事件类型由参数指定。表达式可以是一个方法的名字或一个内联语句，如果没有修饰符也可以省略。

用在普通元素上时，只能监听原生DOM事件。用在自定义元素组件上时，也可以监听子组件触发的自定义事件。
### 绑定事件机制
Vue中提供了v-on：绑定事件机制（冒号后面跟着事件名称）

```js
使用方式：
new app({
    el: "#ap",
    methods: {
        add () {
            alert("我是P标签的点击触发的")
        }
    }
})
<p v-on:click="add"></p>** // 注意: 绑定事件的触发方法需要在配置对象的methods属性中定义
简写方式:
<p @click="add"></p>
```
#### 事件修饰符

```js
.stop - 调用 event.stopPropagation()。 // 阻止冒泡
.prevent - 调用 event.preventDefault()。// 组织默认事件

//capture添加事件侦听器时使用事件捕获模式 //事件触发顺序从外往里
.capture - 添加事件侦听器时使用 capture 模式。 

// 只会组织自己身上冒泡行为的触发, 并不会真正阻止冒泡的行为
// self实现只有点击当前元素时候,才会触发事件处理函数
.self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。 

.{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
.native - 监听组件根元素的原生事件。
.once - 只触发一次回调。
.left - (2.2.0) 只当点击鼠标左键时触发。
.right - (2.2.0) 只当点击鼠标右键时触发。
.middle - (2.2.0) 只当点击鼠标中键时触发。
.passive - (2.3.0) 以 { passive: true } 模式添加侦听器
使用方式: 
<p @click.stop="add"></p> // @事件.事件修饰符
```
#### 按键修饰符
* 自定义全局按键修饰符

```js
// 全局按键修饰符(所有的Vue实例都能调用)定义语法
创建方式：
// F2是定义键盘上的按键名称，等于号后面是对应的键盘码码值
Vue.config.keycodes.F2 = 113
```
* Vue官方提供的按键修饰符

```js
// 为了在必要的情况下支持旧浏览器，Vue 提供了绝大多数常用的按键码的别名：
.enter // 回车键抬起
.tab // tab切换键抬起
.delete (捕获“删除”和“退格”键)
.esc //退出键抬起
.space // 空格键抬起
.up // 上
.down // 下
.left // 左
.right // 右
.对应键盘码 // 使用键盘码是要注意如果不是以上对应的键盘修饰符，需要创建按键修饰符
使用方式:
<p @keyup.enter="add"></p> // @click.按键修饰符
<p @keyup.13="add"></p> // @click.对应键盘码
```
### Vue中的过滤器
自定义过滤器,可被用作于常见的文本格式化,用在两个地方,mustachc插值和v-bind表达式,过滤器添加在JS表达式尾部,由"管道"符指示

过滤器调用的时候,采用就近原则,如果私有过滤器和全局过滤器名称一致,优先调用私有过滤器

过滤器调用时的格式  {{ msg | myFilter }}
* 自定义全局过滤器

```js
// 注意: 函数内部第一个参数一定是你要过滤的这个msg
// 注意: 过滤器myFilter也可以进行传参
// 注意: 过滤器可以多次调用
创建方式:  // myFilter是过滤器的名字
Vue.filter("myFilter", function( msg ){
    return msg.toUpperCase()
})
```
* 自定义局部过滤器

```js
new app({
    el: "#app",
    filters: {
        myFilter: function (val) {
            return val.toUpperCase()
        }
    }
})
```
### Vue中的监听属性
#### watch属性
使用这个属性,可以监听data中数据的变化,然后触发这个watch中对应的属性处理函数
* 监听属性
```js
// watch可以用来监视一些非DOM元素的改变, 这就是他的优势
// watch是一个对象, 键是需要观察的表达式, 值是对应的回调函数
// 主要用来监听某些特定数据的变化,从而进行某也具体的业务逻辑操作,可以看做是computed和methods的结合体
使用方式:
new app({
    el: "#app",
    data: {
        count: 1
    },
    watch: {
        // 函数中有两个参数,一个是newVal, 一个是oldVal具体怎么用去看下官网 很简单
        count: function () {
            console.log("当data中的count属性的值发生变化时被我监听到了")
        }
    }
})
// 使用双向数据绑定count
<input >{{ count }}</input>
```
* 监听路由
watch监视路由变化

```js
// 路由身上有一个this.$router.path属性, 指向当前路由的地址
使用方式: 
new app({
    el: "#app",
    data: {
        count: 1
    },
    watch: {
        // 函数中有两个参数,一个是newVal, 一个是oldVal具体怎么用去看下官网 很简单
        "$route.path": function(newVal, oldVal){
            // 在这里我们就可根据路由的变化去做一些认证, 跳转页面等等的操作
            console.log(`路由新地址${newVale}---路由旧地址${oldVal}`)
        }
    }
})
```
#### computed属性
在 computed 中,可以定一些属性, 这些属性叫做计算属性

计算属性的本质就是一个方法, 只不过我们在使用这些计算属性的时候是吧它们的名称直接当做属性来使用的, 并不会把计算属性当做方法去调用

computed属性的结果会被缓存, 除非依赖的响应式属性变化才会重新计算, 主要当做属性来使用

```js
使用方式:
new app({
    el: "#app",
    data: {
        count: 1
    },
    computed: {
        countComputed () {
            return count + 1
        }
    },
    methods: {
        add () {
            count++
        }
    }
})
<button @click=add>自增</button> // 点击按钮的的时候count自增加1 
<input>{{ countComputed }}</input> // countComputed属性的值永远依赖于count, 并且比它大1

// 注意 : 计算属性在引用的时候一定不要加()去调用,直接把它当做普通属性去引用就好
// 注意 : 计算属性这个function内部所用到的任何data中的数据发生了变化,就会立即重新计算这个计算属性的值
// 注意 : 计算属性的求值结果会被缓存起来, 方便下次直接使用
// 注意 : 如果计算属性方法中, 所依赖的任何数据,都没有发生任何变化,则不会重新对计算属性求值
```

## 第五章 Vue实例的生命周期
生命周期钩子 = 生命周期函数 = 生命周期事件
### 实例创建期间的生命周期函数

```js
// 刚初始化了一个空的实例对象, 这时候只有默认的一些生命周期函数和默认事件, 其他都未创建。
// 如果要调用 methods 中的方法, 或者操作 data 中的数据, 最早只能在 created 生命周期函数中操作
new Vue({
    el: "#app",
    // 在这个生命周期函数执行的时候,data和methods中的数据都还没有初始化
    beforeCreate () {}, // 表示实例完全被创建之前, 会执行这个函数
    // 在这个生命周期函数执行的时候,data和methods中的数据都已经初始化好了
    created () {} // 表示实例被创建之后, 会执行这个函数
})
```
查看Vue生命周期图例, 这里表示Vue开始编译模板, 把Vue代码中的那些指令进行执行, 最终在内存中生成一个编译好的最终模板字符串, 然后把这个字符串渲染为内存中的DOM,此时, 只是在内存中渲染好了模板, 并没有把模板挂载到真正的页面中。
### 运行期间的生命周期函数

```js
new Vue({
    el: "#app",
    // 在这个生命周期函数执行的时候,页面中的元素还没有被真正的替换过来,只是之前写的一些模板字符串
    beforeMounted () {}, // 表示模板已经编译完成,但是还没有把模板渲染到页面中
    
    // 表示模板已经编译完成,内存中的模板已经真实的渲染到了页面中去,已经可以看到渲染好的页面了
    // 注意: mounted是实例创建期间的最后一个生命周期函数,当执行完mounted生命周期函数就表示,
    // 实例已经被完全创建好了,此时如果没有其他操作的话,这个实例就在内存中一动不动
    // 注意: 如果要通过某些插件操作页面上的DOM节点,最早要在mounted生命周期中操作
    mounted () {} 
    
    // 上面的是组件的创建阶段,接下来进入组件的运行阶段
    // 在这个生命周期函数执行的时候,页面中显示的数据还是旧的,但是data中的数据是最新的,
    // 页面尚未和最新的数据保持同步
    beforeUpdate () {} // 表示当前界面还没有被更新,数据肯定被更新了
    // 查看Vue生命周期图例,这里表示先根据data中最新的数据在内存中重新渲染出一份最新的内存DOM树当最新的
    // 内存DOM树更新之后会把最新的内存DOM树重新渲染到真实的页面中去这时候就完成了数据从data(model层)
    // 到view(视图层)的更新
    updated () {} // 表示当前页面和数据保持同步了,都是最新的
})
```
### 销毁期间的生命周期函数
走到这里已经进入组件的销毁阶段了
```js
new Vue({
    el: "#app",
    // 在这个生命周期函数执行的时候.实例身上所有的data和methods以及过滤器、指令等等都是可用状态,还没有
    真正的执行销毁的过程
    beforeDestroy () {}, // 表示Vue实例已经从运行阶段进入到销毁阶段
    // 在这个生命周期函执行的时候,组件中的data和methods以及过滤器、指令等等都已经不可用了
    destroyed(){} // 表示组件已经完全被销毁了
})
```
关于Vue中的生命周期函数, 这里我尽可能的把我自己的理解和认知写了出来, 如果有不对或者不完善的地方请留言告知我。

## 第六章 Vue中的动画
Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。
包括以下工具：

* 在 CSS 过渡和动画中自动应用 class
* 可以配合使用第三方 CSS 动画库，如 Animate.css
* 在过渡钩子函数中使用 JavaScript 直接操作 DOM
* 可以配合使用第三方 JavaScript 动画库，如 Velocity.js
### Vue中的全程动画
第一步： 需要把动画控制的元素用一个transition元素包裹起来，这个元素是Vue官方提供的。

```js
例如：
// <transition> <h3>我被transition元素包裹有了动画效果</h3> </transition>
```
第二步： 需要在style中定义你要控制元素的动画效果, Vue官方提供了6个class切换。

```js
<style>
    // 一般情况下， 元素的其实状态和终止状态的动画是一样的。
    // v-enter（这是一个时间点）是元素进入之前的其实状态，此时还没有开始进入。
    // v-lealve-to（这是一个时间点）是动画离开之后的终止状态，此时动画已经结束。
    v-enter, v-leave-to{
        opctity: 0 translateX(150px)
    }
    // v-enter-active是入场动画的时间段
    // v-leave-active是离场动画的时间段
    v-enter-active，v-leave-active{
        transition： all 0.4s ease
    }
</style>
```
第三步： 可以给动画添加时间属性 :duration

```js
// 设置 :duration="毫秒值" 属性来统一设置入场和离场动画的时长
例如：设置入场和离场的动画时长为200毫秒
<transition :duration="200"> <h3>我被transition元素包裹有了动画效果</h3> </transition>
// 可以给:duration的值为一个对象，分别设置入场和离场的动画时长
例如：
<transition :duration="{enter:200, leave:400}"> <h3>我设置了入场和离场的动画时长</h3> </transition>
```
第四步： 我们可以自定义动画的前缀 v- 将其替换为自定义的

```js
例如：
<style>
    my-enter, my-leave-to{
        opctity: 0 translateX(150px)
    }
    my-enter-active，my-leave-active{
        transition： all 0.4s ease
    }
</style>
<transition name="my"> <h3>自定义动画的v-前缀</h3> </transition>
```
* 注意：在实现列表过滤的时候，如果需要过度的元素是通过v-for循环出来的，不能使用 transition 元素包裹，需要使用 transition-group 元素包裹。
* 注意：再给 transition 和 transition-group 元素添加 appear 属性，可以实现页面创建出来的入场时候的动画。
* 注意：通过为 transition 和 transition-group 元素设置 tag 属性来指定渲染的标签元素，如果不指定默认渲染为 span 标签元素。
* 注意：通过为 transition 和 transition-group 元素设置 mode 属性来提供过度模式

```js
// 当前元素先进行过度，完成之后新元素过度进入
<transition mode="out-in"> <h3>设置动画过度模式</h3> </transition>
// 新元素先进行过度，完成之后当前元素过度离开
<transition mode="in-out"> <h3>设置动画过度模式</h3> </transition>
```
### Vue中的半程动画

```js
// 第一步同样将被动画控制的元素用transition元素包裹起来
// 第二步调用钩子函数， 这里只介绍部分钩子，其余的动画钩子请移步到官网查看
<transition 
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
>
<h1>半程动画</h1></transition>
// 第三步在配置对象中的methods属性中定义方法
new Vue({
    el: "#app",
    methods: {
        // 注意：动画钩子函数的第一个参数 el 表示要执行动画的那个DOM元素，是个原生的js DOM元素
        // beforeEnter函数表示动画入场之前，此时动画还未开始，此时编辑动画之前的样式
        beforeEnter (el) {
            el.style.transform = "translate(0,0)"
        },
        // enter函数表示动画开始之后，这里可以设置完成动画之后的结束状态
        enter (el) {
            // 注意：这里要加一句el.offsetWidth/Height/Left/Right,这句话没有实际的作用。
            // 但是如果不写，不会出来动画效果，这里可以认为它会强制动画刷新。
            el.offsetWidth
            el.style.transform = "translate(150px, 450px)"
            el.style.transiton = all 1s ease
            done()
        },
        // 动画完成之后会调用这个函数
        afterEnter (el) {
            // 这里写动画完成以后的样式
        }
    }
})
```
* 注意：在只用JavaScript过度的时候，在enter和leave中必须使用done进行回调，否则他们将被同步调用，过度会立即完成，看不到动画效果。
### Vue中使用第三方类实现动画（全程）
我们可以通过以下特性来自定义过渡类名：
* enter-class
* enter-active-class
* enter-to-class (2.1.8+)
* leave-class
* leave-active-class
* leave-to-class (2.1.8+)

他们的优先级高于普通的类名，这对于 Vue 的过渡系统和其他第三方 CSS 动画库，如 Animate.css 结合使用十分有用。

例如： 引入第三方 Animate.css 动画库

```js
// 在动画库中选取我们想要的动画效果名称，例如入场选 bounceln, 离场 bounceOut
<transition 
    enter-active-class="animated bounceln"
    leave-active-class="animated bounceOut"
> 
    <h3>引用第三方动画库</h3> 
</transition>
```
* 注意：在引用第三方动画库选定动画类的的时候还要在其前面加上一个基本的类animated

个人推荐在使用Vue的时候如果动画效果简单自己写就行，复杂的话在引用第三方动画库。而且在给元素添加动画的时候，要考虑清楚是加全程动画还是半程动画就够类。
## 第七章 Vue中的组件
学习组件，我们首先要了解什么是组件。组件是Vue可以复用的Vue实例，且带有一个名字，在Vue中我们可以定义多个组件，在多个不同的页面的中引用多个多不同的组件，减少开发的工作量。因为组件是可复用的Vue实例，所以它们与new Vue接收相同的选项，例如：data,computed,watch,methods以及生命周期钩子等等，仅有的例外是像el这样根实例特有的选项。
### 创建组件的几种方式
* 第一种使用Vue.extend来创建全局的Vue组件

```js
// 创建组件模版对象
let mycomponent = Vue.extend({
    // 通过template属性指定了组件要展示的HTML结构
    template:"<div>我是使用Vue.extend创建的组件</div>" // 
})

// 使用Vue.component("组件名称", 创建出来的组件模版对象)
Vue.component("custom", mycomponent) 

// 直接把组件的名称以HTML标签的形式引入到页面中就可以使用了
<custom></custom> 
```
**注意 ：不论是那种方式创建出来的组件，组件的template属性指向的模版内容，必须有且只能有一个唯一的根元素。**

**注意 ：在使用Vue.component定义全局组件的时候，组件名称使用驼峰命名，则在引用组件的时候，需要把大写的驼峰改为小写的字母，同时两个单词之间使用 - 连接，例如：**

```js
Vue.component("customLabel", mycomponent) // 组件名称驼峰命名
<custom-label></custom-label> // 驼峰改为小写的字母，同时两个单词之间使用 - 连接
```
注册全局组件引用的简写方式：

```js
Vue.component("custom", Vue.extend({
    // 通过template属性指定了组件要展示的HTML结构
    template:"<div>我是使用Vue.extend创建的组件</div>" // 
})) 
```
* 第二种使用Vue.component创建全局的Vue组件

```js
Vue.component("custom", {
    // 通过template属性指定了组件要展示的HTML结构
    template:"<div>我是使用Vue.component创建的组件</div>" // 
})

// 通过Vue.component的另一种书写方式创建全局组件
Vue.component("custom", {template:"#tmp"}) //  template属性指向一个id
// 在被控制的Vue实例el绑定的元素外，使用template元素定义组件的HTML模版结构
<template id="tmp">
    <div>
        <h1>我是Vue.component创建全局组件的第二种方式</h1>
    </div>
</template>
```
* 第三种通过Vue实例的components属性创建Vue局部组件（实例内部私有组件）

```js
<div id="app">
    <custom>/custom>
    <customTwo></customTwo>
    <customThree></customThree>
</div>
<template id="tmp">
    <div>
        <h1>我是components创建的局部组件利用template元素</h1>
    </div>
</template>
<script>
    let customThree = {
        template: "<div><h1>我是Vue实例外创建的组件模版对象</h1></div>"
    }
    new Vue({
    el: "#app",
    components: {
        // 第一种方式
        "custom": {template:"<div><h1>我是components创建的局部组件</h1></div>"},
        // 第二种方式
        "customTwo"{template:"#tmp"}，
        // 第三种方式
        "customThree": customThree // 自定义组件名称和组件模版对象名称一致可以简写为一个
    }
})
</script>
```
**注意 ： 组件中也可以定义数据和属性**

```js
// 但是组件中的data和实例中的data不一样，实例中的data可以为一个对象，但组件中的data必须是一个方法。
// 这个方法内部还必须return一个对象出来才行。
// 组件中data的数据和实例中data数据的使用方式完全一样
// 例如：
new Vue({
    el: "#app",
    data: {
        msg: "我是实例中data的数据"
    }
})
Vue.components("custom",{
    template:"<div> <h1>{{ msg }}</h1></div>",
    data () {
        return {
            msg: "我是组件中data的数据"
        }
    }
})
```
### Vue提供了components元素来展示对应名称的组件

```js
// components是一个占位符， :is 属性可以用来指定要展示的组件名称
// 注意 :is 属性的值为要展示的组件名称，但是也可以写成一个变量，方便某些时候动态切换要展示的组件。
<div id="app">
    <component :is="msg"></component>
    <button @click="change">切换组件</button>
</div>
<script>
    new Vue({
    el: "#app",
    data: {
        msg: "custom"
    },
    components: {
        "custom": {template:"<div><h1>我是components创建的局部组件custom</h1></div>"}，
        "customTwo": {template:"<div><h1>我是components创建的局部组件customTwo</h1></div>"}
    },
    methods: {
        change () {
            // 通过chage方法动态改变msg的值来切换要展示的组件
        }
    }
})
</script>
```
### 组件通信 => 父子组件，兄弟组件之间通信
* 组件通信中，子组件是无法访问到父组件中的数据和方法的。
* 父组件可以在引用子组件的时候，通过属性绑定(v-bind)的形式，把数据传递给子组件使用。
* 父组件通过自定义属性传过来的数据，需要子组件在props属性上接收才能使用。
#### 父传子值

```js
<div id="app">
    <custom :parentmsg="msg"></custom>
</div>
<script>
    new Vue({
    el: "#app",
    data: {
        msg: "我是父组件中的数据"
    },
    components: {
        "custom": {
            props: ["parentmsg"]，// 子组件通过props属性接收父组件传来的数据
            template:"<div><h1>我要引用父组件中的数据----{{ parentmsg }}</h1></div>"
        }
    }
})
</script>
```
### 父传子方法, 子传父数据
父组件向子组件传递方法，使用的是事件绑定机制v-on,当我们自定义事件属性后，那么子组件就可以通过某些方式来调用父组件传递的这个方法。

```js
<div id="app">
    // 通过自定义事件名称func以事件绑定机制@func="show"将父组件的show方法传递给子组件
    <custom @func="show"></custom> 
</div>
<script>
    new Vue({
    el: "#app",
    data: {
        msg: "我是父组件中的数据"
    },
    components: {
        "custom": {
            props: ["parentmsg"]，// 子组件通过props属性接收父组件传来的数据
            data () {
                return {
                    childmsg: "我是子组件的数据"
                }
            },
            template:`
                <div>
                    <h1>我要调用父组件传递过来的方法</h1>
                    <button @click="emit">点我调用父组件传递的方法</button>
                </div>`，
            methods: {
                emit () {
                    // 触发父组件传过来的func方法，配合参数可以将子组件的数据传递给父组件
                    // vm.$emit(evebtNane, [...args]) 触发当前实例上的事件，附加参数会传给监听器回调。
                    this.$emit("func"，this.childmsg) 
                }
            }
        }，
    }，
    methods: {
        // 子组件触发了我，并且给我传递了子组件的数据data
        show (data) {
            console.log("我是父组件中的show方法")
            console.log("接收到了子组件传递的数据---" + data)
        }
    }
})
</script>
```
* 注意组件中所有props属性中的数据，都是通过父组件传递给子组件的。
* props中的数据都是只读不可写的，data上的数据都是可读可写的，
* 子组件中data中的数据，并不是通过父组件传递过来的，而是子组件自己私有的。
### 兄弟组件之间数据传递
* 第一种借助中央事件总线

```js
<div id="app">
    
</div>
<script>
    // 重新实例一个Vue
    let Bus = new Vue()
    
    new Vue({
        el: "#app",
        components: {
            "custom": {
                template:`<div @click = sendMsg>
                    <button>点我给customTwo组件传递我的数据</button>
                </div>`,
                data () {
                    return {
                        msg: "我是custom组件的数据"
                    }
                },
                methods: {
                    sendMsg () {
                        Bus.$emit("myFunc", this.msg) // $emit这个方法会触发一个事件
                    }
                }
            }，
            "customTwo": {
                template:`<div>
                    <h1>下面是我接收custom组件传来的数据</h1>
                    <p>{{ customTwoMsg }}</p>
                </div>`,
                data () {
                    return {
                        customTwoMsg: ""
                    }
                }，
                created () {
                    this.brotherFunc()
                },
                methods: {
                    brotherFunc () {
                        Bus.$on("myFunc", (data) => { // 这里要用箭头函数，否则this指向有问题。
                            this.customTwoMsg = data
                        })
                    }
                }
            }
        }
    })
</script>
```
这样借助总线机制，实现兄弟组件之间的数据共享。
* 第二种借助第三方vuex库（这是我推荐使用的）

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

具体用法请查看[vuex官方文档](https://vuex.vuejs.org/zh/guide/)超级详细。

## 第八章 Vue中的标签/如何获取DOM元素

Vue中提供了一些固定的标签来方便我们在开发过程中使用，并且在开发过程中，我们很有可能因为要使用某些第三方库而不得已要操作DOM元素，因此如何获取并操作DOM元素的使用呢。

### Vue中提供的标签
* component

这个标签是用来展示组件的

```js
<div id="app">
    <component :is="要展示的组件名称"></component> 
    <custom></custom> // 直接通过自定义组件名称当作标签使用
</div>
new Vue({
    el: "#app",
    components: {
        "要展示的组件名称": {
            template: `<div> // 注意自定义组件的模版对象需要有且只有一个根标签。
                <h1>我是自定的组件一</h1>
            </div>`
        }，
        "custom": {
            template: `<div>
                <h1>我是自定义组件二</h1>
            </div>`
        }
    }
})

```
* template

这个标签用来定义组件的HTML结构

```js
<div id="app">
    <custom></custom>
</div>
<template id="tmp">
    <div>
        <h1>我是用template标签定义组件的HTML模版</h1>
    </div>
</template>
new Vue({
    el: "#app",
    components: {
        "custom": {
            template: "#tmp"
        }
    }
})
```
* transition

这个标签是用来把需要被动画控制的元素包裹起来，展示自定义的动画效果

```js
<style>
    // 一般情况下， 元素的其实状态和终止状态的动画是一样的。
    // v-enter（这是一个时间点）是元素进入之前的其实状态，此时还没有开始进入。
    // v-lealve-to（这是一个时间点）是动画离开之后的终止状态，此时动画已经结束。
    v-enter, v-leave-to{
        opctity: 0 translateX(150px)
    }
    // v-enter-active是入场动画的时间段
    // v-leave-active是离场动画的时间段
    v-enter-active，v-leave-active{
        transition： all 0.4s ease
    }
</style>
<div id="app">
    <transition>
        <h1>我是有动画效果的</h1>
    </transition>
</div>
```
* transition-group

通过v-for渲染出来的标签不能使用transition包裹， 需要使用transition-group包裹添加动画。


```js
<style>
    // 一般情况下， 元素的其实状态和终止状态的动画是一样的。
    // v-enter（这是一个时间点）是元素进入之前的其实状态，此时还没有开始进入。
    // v-lealve-to（这是一个时间点）是动画离开之后的终止状态，此时动画已经结束。
    v-enter, v-leave-to{
        opctity: 0 translateX(150px)
    }
    // v-enter-active是入场动画的时间段
    // v-leave-active是离场动画的时间段
    v-enter-active，v-leave-active{
        transition： all 0.4s ease
    }
</style>
<div id="app">
    <transition-group tag="ul">
        <li v-for="item of list" :key="item.id">
            <h1>我是有动画效果的</h1>
        </li>
    </transition-group>
</div>
new Vue({
    el: "#app",
    data: {
        list:[
            {name:"fanqie", id: 1},
            {name: "chaofan", id: 2}
        ]
    }
})
```
* keep-alive

当前标签包裹组件时，会缓存不活动的组件实例，而不是销毁它们，keep-alive是一个抽象组件：它自身不会渲染一个DOM元素，也不会出现在父组件中。

当组件在keep-alive内被切换，它的 activated 和 deactivated 这个两个生命周期钩子函数将会被对应执行。

```js
// 主要用于保留组件状态或避免重新渲染。
<!-- 基本 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>

<!-- 多个条件判断的子组件 -->
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>

<!-- 和 `<transition>` 一起使用 -->
<transition>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
</transition>
```
注意，keep-alive 是用在其一个直属的子组件被开关的情形。如果你在其中有 v-for 则不会工作。如果有上述的多个条件性的子元素，keep-alive 要求同时只有一个子元素被渲染。
* solt

slot 元素作为组件模板之中的内容分发插槽。slot 元素自身将被替换。

```js
// 和HTML元素一样，我们经常需要向组件传递内容，例如：
// custom 是自定义的组件
<custom> 
    <div>我是在组件内添加的标签</div>
</custom> 
```
但是我们渲染出来的却是这样：

![](https://user-gold-cdn.xitu.io/2019/4/1/169d6d92a7b2eebb?w=1054&h=96&f=png&s=12833)
幸好，Vue 自定义的 slot 元素让这变得非常简单：

```js
Vue.component('custom', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
```
### Vue中获取DOM元素
在我们的vue项目中，难免会因为引用第三方库而需要操作DOM标签，vue为我们提供了ref属性。
ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例：

```js
<p ref="p"></p>
// 现在在你已经定义了这个 ref 的组件里，你可以使用：
this.$refs.p 来操作这个DOM元素来。
```
vue不提倡我们操作DOM元素，因此在引用第三方插件或者项目中，尽量少的不要出现操作DOM元素。