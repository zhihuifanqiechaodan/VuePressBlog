# Vue2.0进阶学习笔记
本篇笔记将在后续持续更新在使用Vue开发过程中的一些插件，组件的用法进行详细介绍。
## 进阶一 如何在Vue项目中导出Excel
Excel 的导入导出都是依赖于js-xlsx来实现的。

在 js-xlsx的基础上又封装了Export2Excel.js来方便导出数据。
### 使用
由于 Export2Excel不仅依赖js-xlsx还依赖file-saver和script-loader。

所以你先需要安装如下命令：

```js
npm install xlsx file-saver -S
npm install script-loader -S -D
```
由于js-xlsx体积还是很大的，导出功能也不是一个非常常用的功能，所以使用的时候建议使用懒加载。使用方法如下：

```js
import('@/vendor/Export2Excel').then(excel => {
  excel.export_json_to_excel({
    header: tHeader, //表头 必填
    data, //具体数据 必填
    filename: 'excel-list', //非必填, 导出文件的名字
    autoWidth: true, //非必填, 导出文件的排列方式
    bookType: 'xlsx' //非必填, 导出文件的格式
  })
})
```
### 注意
在v3.9.1+以后的版本中移除了对 Bolb 的兼容性代码，如果你还需要兼容很低版本的浏览器可以手动引入blob-polyfill进行兼容。
### 参数

| 参数               | 说明                  | 类型     | 可选值 | 默认值 |
| ------------------|----------------------| ---------|-------|-------|
| header            | 导出数据的表头         |  Array   | /     |   []   |
| data              | 导出数据的表头         |  Array    |/     |   []  |
| filename          | 导出数据的表头         |  String   |/     |excel-list|
| autoWidth         | 单元格是否要自适应宽度   |  Boolean  |true / false|true|
| fibookTypelename  | 导出文件类型           |  String   |xlsx, csv, txt, more| xlsx|

### 项目实战
使用脚手架搭建出基本项目雏形,这时候在src目录下新建一个vendor(文件名自己定义)文件夹,新建一个Export2Excel.js文件,这个文件里面在js-xlsx的基础上又封装了Export2Excel.js来方便导出数据。
* 目录如下
![](https://user-gold-cdn.xitu.io/2019/4/18/16a2e7b05ada4bb5?w=462&h=670&f=png&s=47490)
* Export2Excel.js代码如下

```js
require('script-loader!file-saver');
import XLSX from 'xlsx'

function generateArray(table) {
  var out = [];
  var rows = table.querySelectorAll('tr');
  var ranges = [];
  for (var R = 0; R < rows.length; ++R) {
    var outRow = [];
    var row = rows[R];
    var columns = row.querySelectorAll('td');
    for (var C = 0; C < columns.length; ++C) {
      var cell = columns[C];
      var colspan = cell.getAttribute('colspan');
      var rowspan = cell.getAttribute('rowspan');
      var cellValue = cell.innerText;
      if (cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue;

      //Skip ranges
      ranges.forEach(function (range) {
        if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
          for (var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
        }
      });

      //Handle Row Span
      if (rowspan || colspan) {
        rowspan = rowspan || 1;
        colspan = colspan || 1;
        ranges.push({
          s: {
            r: R,
            c: outRow.length
          },
          e: {
            r: R + rowspan - 1,
            c: outRow.length + colspan - 1
          }
        });
      };

      //Handle Value
      outRow.push(cellValue !== "" ? cellValue : null);

      //Handle Colspan
      if (colspan)
        for (var k = 0; k < colspan - 1; ++k) outRow.push(null);
    }
    out.push(outRow);
  }
  return [out, ranges];
};

function datenum(v, date1904) {
  if (date1904) v += 1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data, opts) {
  var ws = {};
  var range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  };
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      var cell = {
        v: data[R][C]
      };
      if (cell.v == null) continue;
      var cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R
      });

      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      } else cell.t = 's';

      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

export function export_table_to_excel(id) {
  var theTable = document.getElementById(id);
  var oo = generateArray(theTable);
  var ranges = oo[1];

  /* original data */
  var data = oo[0];
  var ws_name = "SheetJS";

  var wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data);

  /* add ranges to worksheet */
  // ws['!cols'] = ['apple', 'banan'];
  ws['!merges'] = ranges;

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });

  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), "test.xlsx")
}

export function export_json_to_excel({
  multiHeader = [],
  header,
  data,
  filename,
  merges = [],
  autoWidth = true,
  bookType = 'xlsx'
} = {}) {
  /* original data */
  filename = filename || 'excel-list'
  data = [...data]
  data.unshift(header);

  for (let i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i])
  }

  var ws_name = "SheetJS";
  var wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data);

  if (merges.length > 0) {
    if (!ws['!merges']) ws['!merges'] = [];
    merges.forEach(item => {
      ws['!merges'].push(XLSX.utils.decode_range(item))
    })
  }

  if (autoWidth) {
    /*设置worksheet每列的最大宽度*/
    const colWidth = data.map(row => row.map(val => {
      /*先判断是否为null/undefined*/
      if (val == null) {
        return {
          'wch': 10
        };
      }
      /*再判断是否为中文*/
      else if (val.toString().charCodeAt(0) > 255) {
        return {
          'wch': val.toString().length * 2
        };
      } else {
        return {
          'wch': val.toString().length
        };
      }
    }))
    /*以第一行为初始值*/
    let result = colWidth[0];
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j]['wch'] < colWidth[i][j]['wch']) {
          result[j]['wch'] = colWidth[i][j]['wch'];
        }
      }
    }
    ws['!cols'] = result;
  }

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var wbout = XLSX.write(wb, {
    bookType: bookType,
    bookSST: false,
    type: 'binary'
  });
  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), `${filename}.${bookType}`);
}
```
* 新建一个exportExcel.vue模板用于导出Excel表格,使用代码如下

```js
<template>
  <div class="exportExcel">
    <div class="excel-header">
      <!--导出文件名称-->
      <div class="filename">
        <label class="radio-label" style="padding-left:0;">Filename:</label>
        <el-input
          v-model="filename"
          placeholder="请输入导出文件名"
          style="width:340px;"
        prefix-icon="el-icon-document" />
      </div>
      <!--设置表格导出的宽度是否自动-->
      <div class="autoWidth">
        <label class="radio-label">Cell Auto-Width:</label>
        <el-radio-group v-model="autoWidth">
          <el-radio :label="true" border>True</el-radio>
          <el-radio :label="false" border>False</el-radio>
        </el-radio-group>
      </div>
      <!--导出文件后缀类型-->
      <div class="bookType">
        <label class="radio-label">Book Type:</label>
        <el-select v-model="bookType" style="width:120px;">
          <el-option v-for="item in options" :key="item" :label="item" :value="item"/>
        </el-select>
      </div>
      <!--导出文件-->
      <div class="download">
        <el-button
          :loading="downloadLoading"
          type="primary"
          icon="document"
        @click="handleDownload">export Excel</el-button>
      </div>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
      height="390px"
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="订单号" width="230">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column label="菜品" align="center">
        <template slot-scope="scope">{{ scope.row.foods }}</template>
      </el-table-column>
      <el-table-column label="收银员" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="金额" width="115" align="center">
        <template slot-scope="scope">{{ scope.row.pageviews }}</template>
      </el-table-column>
      <el-table-column align="center" label="时间" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

export default {
  name: "exportExcelDialog",
  data() {
    return {
      // 列表内容
      list: null,
      // loding窗口状态
      listLoading: true,
      // 下载loding窗口状态
      downloadLoading: false,
      // 导出文件名称
      filename: "",
      // 导出表格宽度是否auto
      autoWidth: true,
      // 导出文件格式
      bookType: "xlsx",
      // 默认导出文件后缀类型
      options: ["xlsx", "csv", "txt"]
    };
  },
  methods: {
    // 导出Excel表格
    handleDownload() {
      this.downloadLoading = true;
      // 懒加载该用法
      import("@/vendor/Export2Excel").then(excel => {
        // 设置导出表格的头部
        const tHeader = ["序号", "订单号", "菜品", "收银员", "金额", "时间"];
        // 设置要导出的属性
        const filterVal = [
          "id",
          "title",
          "foods",
          "author",
          "pageviews",
          "display_time"
        ];
        // 获取当前展示的表格数据
        const list = this.list;
        // 将要导出的数据进行一个过滤
        const data = this.formatJson(filterVal, list);
        // 调用我们封装好的方法进行导出Excel
        excel.export_json_to_excel({
          // 导出的头部
          header: tHeader,
          // 导出的内容
          data,
          // 导出的文件名称
          filename: this.filename,
          // 导出的表格宽度是否自动
          autoWidth: this.autoWidth,
          // 导出文件的后缀类型
          bookType: this.bookType
        });
        this.downloadLoading = false;
      });
    },
    // 对要导出的内容进行过滤
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return this.parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    // 过滤时间
    parseTime(time, cFormat) {
      if (arguments.length === 0) {
        return null;
      }
      const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
      let date;
      if (typeof time === "object") {
        date = time;
      } else {
        if (typeof time === "string" && /^[0-9]+$/.test(time)) {
          time = parseInt(time);
        }
        if (typeof time === "number" && time.toString().length === 10) {
          time = time * 1000;
        }
        date = new Date(time);
      }
      const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
      };
      const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === "a") {
          return ["日", "一", "二", "三", "四", "五", "六"][value];
        }
        if (result.length > 0 && value < 10) {
          value = "0" + value;
        }
        return value || 0;
      });
      return timeStr;
    }
  },
  mounted() {
    // 模拟获取数据
    setTimeout(() => {
      this.list = [
        {
          timestamp: 1432179778664,
          author: "Charles",
          comment_disabled: true,
          content_short: "mock data",
          display_time: "1994-05-25 23:37:25",
          foods: "鸡翅、萝卜、牛肉、红烧大闸蟹、红烧鸡翅",
          id: 1,
          image_uri:
            "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          importance: 3,
          pageviews: 2864,
          platforms: ["a-platform"],
          reviewer: "Sandra",
          status: "published",
          title: "O20190407135010000000001",
          type: "CN"
        }
      ];
      this.listLoading = false;
    }, 2000);
  },
  filters: {
    // 过滤时间
    parseTime(time, cFormat) {
      if (arguments.length === 0) {
        return null;
      }
      const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
      let date;
      if (typeof time === "object") {
        date = time;
      } else {
        if (typeof time === "string" && /^[0-9]+$/.test(time)) {
          time = parseInt(time);
        }
        if (typeof time === "number" && time.toString().length === 10) {
          time = time * 1000;
        }
        date = new Date(time);
      }
      const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
      };
      const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === "a") {
          return ["日", "一", "二", "三", "四", "五", "六"][value];
        }
        if (result.length > 0 && value < 10) {
          value = "0" + value;
        }
        return value || 0;
      });
      return timeStr;
    }
  }
}
```
* 效果图如下

![](https://user-gold-cdn.xitu.io/2019/4/18/16a2ef02a2cbed75?w=1879&h=591&f=png&s=118757)
用法都是看GitHub开源项目的和博客的,自己本身还没有二次封装这样内容的实力,欢迎大佬提出宝贵的意见。

## 进阶二 如何在Vue项目使用富文本

### 富文本
富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。

这里在简述一下推荐使用 tinymce 的原因：tinymce 是一家老牌做富文本的公司(这里也推荐 ckeditor，也是一家一直做富文本的公司，新版本很不错)，它的产品经受了市场的认可，不管是文档还是配置的自由度都很好。在使用富文本的时候有一点也很关键就是复制格式化，之前在用一款韩国人做的富文本 summernote 被它的格式化坑的死去活来，但 tinymce 的去格式化相当的好，它还有一些增值服务(付费插件)，最好用的就是powerpaste，非常的强大，支持从 word 里面复制各种东西，而且还帮你顺带格式化了。富文本还有一点也很关键，就是拓展性。楼主用 tinymce 写了好几个插件，学习成本和容易度都不错，很方便拓展。最后一点就是文档很完善，基本你想得到的配置项，它都有。tinymce 也支持按需加载，你可以通过它官方的 build 页定制自己需要的 plugins。

**以上内容引自[vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/feature/component/rich-editor.html)作者官网**
### Tinymce的使用方法
目前采用全局引用的方式。代码地址：static/tinymce (static 目录下的文件不会被打包), 在 index.html 中引入。并确保它的引入顺序在你的app.js之前！
* 第一步 我们需要去官网下载他的源文件,或者引入在线地址
* 第二步 由于TinyMCE允许通过CSS选择器识别可替换元素，因此唯一的要求是传递包含selectorto 的对象tinymce.init()。

```js
在这个例子中，替换<textarea id='mytextarea'>
通过使选择器与TinyMCE的5.0编辑器实例'#mytextarea'来tinymce.init()。
<!DOCTYPE html>
<html>
<head>
  <script src='https://cloud.tinymce.com/5/tinymce.min.js?apiKey=your_API_key'></script>
  <script>
  tinymce.init({
    selector: '#mytextarea'
  });
  </script>
</head>

<body>
<h1>TinyMCE Quick Start Guide</h1>
  <form method="post">
    <textarea id="mytextarea">Hello, World!</textarea>
  </form>
</body>
</html>
```
* 第三步 使用表单POST保存内容,当form被提交后，TinyMCE的5.0主编模仿一个普通的HTML行为textarea过程中POST。在用户的表单处理程序中，提交的内容可以与从常规创建的内容相同的方式处理textarea。
### 项目实战
由于目前使用 npm 安装 Tinymce 方法比较复杂而且还有一些问题(日后可能会采用该模式)且会大大增加编译的时间所以暂时不准备采用。所以这里直接去官网下载源文件保存在项目static文件夹中
#### 使用
由于富文本不适合双向数据流，所以只会 watch 传入富文本的内容一次变化，之后传入内容的变化就不会再监听了，如果之后还有改变富文本内容的需求。

可以通过 this.refs.xxx.setContent() 手动来设置。
* 官网下载[源文件](https://www.tiny.cloud/docs/quick-start/)放在static文件下如图

![](https://user-gold-cdn.xitu.io/2019/4/19/16a3356321b7a0f2?w=464&h=201&f=png&s=12225)
* 在index.html页面中引入 tinymce.min.js文件, 确保它的引入顺序在你的app.js之前！如图

![](https://user-gold-cdn.xitu.io/2019/4/19/16a335851214ab2a?w=887&h=375&f=png&s=51123)
* 在component文件夹内创建一个Tinymce文件夹用于封装我们要使用的富文本组件, 目录如图

![](https://user-gold-cdn.xitu.io/2019/4/19/16a336eeee6fd42d?w=411&h=172&f=png&s=12057)
其中两个js文件是对应的工具栏列表等其他插件功能, index.vue是封装好的模板,components中的组件是封装的图片上传的弹窗功能

plugins.js文件的代码如下
```js
const plugins = ['advlist anchor autolink autosave code codesample colorpicker colorpicker
contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link
lists media nonbreaking noneditable pagebreak paste preview print save searchreplace
spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount']

export default plugins
```
toolbar.js文件的代码如下

```js
const toolbar = ['searchreplace bold italic underline strikethrough alignleft aligncenter
alignright outdent indent  blockquote undo redo removeformat subscript superscript code
codesample', 'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime
media table emoticons forecolor backcolor fullscreen']

export default toolbar
```
index.vue组件的代码如下

```js
<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container editor-container">
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <div class="editor-custom-btn-container">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
    </div>
  </div>
</template>

<script>
// 导入图片上传的组件
import editorImage from './components/editorImage'
// 导入富文本插件
import plugins from './plugins'
// 导入富文本工具栏
import toolbar from './toolbar'

export default {
  name: 'Tinymce',
  components: { editorImage },
  props: {
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: Number,
      required: false,
      default: 360
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        'en': 'en',
        'zh': 'zh_CN'
      }
    }
  },
  computed: {
    language() {
      return 'zh_CN'
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    },
    language() {
      this.destroyTinymce()
      this.$nextTick(() => this.initTinymce())
    }
  },
  mounted() {
    this.initTinymce()
  },
  activated() {
    this.initTinymce()
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    initTinymce() {
      const _this = this
      window.tinymce.init({
        language: this.language,
        selector: `#${this.tinymceId}`,
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        }
        // 整合七牛上传
        // images_dataimg_filter(img) {
        //   setTimeout(() => {
        //     const $image = $(img);
        //     $image.removeAttr('width');
        //     $image.removeAttr('height');
        //     if ($image[0].height && $image[0].width) {
        //       $image.attr('data-wscntype', 'image');
        //       $image.attr('data-wscnh', $image[0].height);
        //       $image.attr('data-wscnw', $image[0].width);
        //       $image.addClass('wscnph');
        //     }
        //   }, 0);
        //   return img
        // },
        // images_upload_handler(blobInfo, success, failure, progress) {
        //   progress(0);
        //   const token = _this.$store.getters.token;
        //   getToken(token).then(response => {
        //     const url = response.data.qiniu_url;
        //     const formData = new FormData();
        //     formData.append('token', response.data.qiniu_token);
        //     formData.append('key', response.data.qiniu_key);
        //     formData.append('file', blobInfo.blob(), url);
        //     upload(formData).then(() => {
        //       success(url);
        //       progress(100);
        //     })
        //   }).catch(err => {
        //     failure('出现未知问题，刷新页面，或者联系程序员')
        //     console.log(err);
        //   });
        // },
      })
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(arr) {
      const _this = this
      arr.forEach(v => {
        window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
      })
    }
  }
}
</script>

<style scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}
.tinymce-container>>>.mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>

```
图片上传组件editorImage的代码如下

```js
<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">
      上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        action="https://httpbin.org/post"
        list-type="picture-card"
      >
        <el-button size="small" type="primary">
          点击上传
        </el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">
        取 消
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        确 定
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: []
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.files.file
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>

```
以上代码直接复制到本地就能够直接使用
* 接下来在需要使用富文本组件的地方引用tinymce文件下的index.vue文件即可,如图使用


![](https://user-gold-cdn.xitu.io/2019/4/19/16a33a7758c67ce4?w=874&h=594&f=png&s=86718)
当form被提交后，TinyMCE的5.0主编模仿一个普通的HTML行为textarea过程中POST。在用户的表单处理程序中，提交的内容可以与从常规创建的内容相同的方式处理textarea。

这里定义了一个add方法 在富文本内编辑内容后,点击提交按钮即可获取到postForm.content的内容(富文本编辑的内容)

**当我们把富文本的内容传递后台后,如果有二次编辑的需求,后台又将数据原封不动的传递给前端,如何将传递回来的数据放置在富文本中呢?**

```js
使用方式:
调用tinymce组件中的setContent()方法即可;
例如通过chage方法调用
change () {
      this.$refs.Tinymce.setContent("'<h1>我是后台传递回来的数据,要放在富文本中二次编辑内容<h1>'")
    }
```
封装的代码都是看vue-element-admin开源项目的,具体代码还在学习当中,欢迎提出宝贵意见

## 进阶三 如何在Vue项目使用阿里iconfont图标
**我们在使用vue进行项目开发的时候,很多时候会手撸样式或者使用ui框架,这时候ui框架提供的原生icon图标可能会满足我们现有的需求,这时候我们就可以引用第三方图标库来达到我们的需求。**

这里讲解的是如何在vue中使用阿里图标;
```js
阿里图标库有三种使用方式（Unicode、Font class、Symbol)
这里主要说明 Font class 的使用方法（其他方法类似）
```
### 一、引入
* 登录阿里图标官网注册一个帐号,在图标库中选取自己需要的图标加入购物车

![](https://user-gold-cdn.xitu.io/2019/7/26/16c2bb7dbdc9b5be?w=1814&h=750&f=png&s=63794)
* 点击购物车查看我已经添加到购物车的图标,点击添加至项目,没有项目新建一个

![](https://user-gold-cdn.xitu.io/2019/7/26/16c2bbae6fd05f92?w=1076&h=1922&f=png&s=117152)
* 进入我的项目中,将图标下载至本地,在vue项目中assets文件下新建iconfont文件夹将下载的图标复制到这里

```js
因为这里主要说明Font class 的使用方法,所以只需要拷贝这两个文件（其他方法类似）
```

![](https://user-gold-cdn.xitu.io/2019/7/26/16c2bec9394747a8?w=1422&h=561&f=png&s=74506)
* 注意这里需要将iconfont.css文件中引用的路径全部修改为'./iconfont.ttf'

```js
这里全部改为'./iconfont.ttf'是因为我们当前只使用Font class 的使用方法（其他方法类似）
```
![](https://user-gold-cdn.xitu.io/2019/7/26/16c2bf81b862e3d8?w=1784&h=1344&f=png&s=250211)
* 在main.js文件中引入阿里图标,将其挂载到全局,以后每个页面都可以使用
![](https://user-gold-cdn.xitu.io/2019/7/26/16c2bee0a5b8575c?w=1772&h=1071&f=png&s=170561)
```js
这里引入阿里图标样式可能会报错,原因是没有css-loader依赖包,安装一下就可以了
npm install css-loader -S
```
* 这里阿里图标的引入就全部完成了,接下来使用方式如图:

![](https://user-gold-cdn.xitu.io/2019/7/26/16c2bf0acce32c39?w=1764&h=997&f=png&s=167653)
****
**这里使用阿里图标都需要加iconfont前缀类名,否则不会显示出来的,当然这个类名是可以在阿里图标官网自己编辑的,默认都是iconfont**
* 修改默认iconfont前缀类名

![](https://user-gold-cdn.xitu.io/2019/7/26/16c2bf30de05180a?w=1616&h=708&f=png&s=93763)
* 修改Font Famliy 修改为myicon,点击保存重新下载至本地替换当前阿里图标即可

![](https://user-gold-cdn.xitu.io/2019/7/26/16c2bf3f690f3561?w=892&h=910&f=png&s=60365)
* 这时候使用图标时前缀加myicon即可了

![](https://user-gold-cdn.xitu.io/2019/7/26/16c2bf5f7a1c6ffc?w=1821&h=919&f=png&s=169177)
**以上就是如何在vue中引用阿里图标的简单步骤。**

## 进阶四 如何在Vue项目中跨域以及打包部署到nginx跨域设置
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

```
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

```
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

## 进阶五 如何在Vue项目中设置路由跳的转进度条和数据加载Loading显示
我们在Vue项目中路由跳转时希望出现一个进度条来显示当前跳转状态,或者在数据发起请求时有个loading提示框来提示当前正在加载数据,本篇文章简单介绍一下我在项目中的使用方法。

### 路由跳转进度条
NProgress是页面跳转时出现在浏览器顶部的进度条 
![](https://user-gold-cdn.xitu.io/2019/9/2/16cf093d4834d6b0?w=487&h=284&f=gif&s=19281)

* [官网](http://ricostacruz.com/nprogress/)

* [github](https://github.com/rstacruz/nprogress)
* NProgress 安装

```js
npm install --save nprogress
```
* NProgress 使用
```js
// 如果在main.js引入并挂载在Vue实例上,请最在顶部引入,否则会出现问题。
// NProgress最重要两个API就是start()和done()，基本一般用这两个就足够了。
// router.js页面
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to, from, next) => {
  NProgress.start() // 显示进度条
  next()
})

router.afterEach(() => {
  NProgress.done() // 完成进度条
})
```
* NProgress 高级用法

```js
// (1)百分比：通过设置progress的百分比，调用 .set(n)来控制进度，其中n的取值范围为0-1。
NProgress.set(0.0)   
NProgress.set(0.4)
NProgress.set(1.0)

// (2)递增：要让进度条增加，只要调用.inc()。这会产生一个随机增量，但不会让进度条达到100%。
// 此函数适用于图片加载或其他类似的文件加载。
NProgress.inc()

// (3)强制完成：通过传递 true 参数给done()，使进度条满格，即使它没有被显示
NProgress.done(true)
```
* NProgress 其他配置

```js
// (1)minimum：设置最低百分比
NProgress.configure({minimum:0.1})

// (2)template：改变进度条的HTML结构。为保证进度条能正常工作，需要元素拥有role=’bar’属性。
NProgress.configure({
    template:"<div class='....'>...</div>"
})

// (3)ease：调整动画设置，ease可传递CSS3缓冲动画字符串例如:
// (ease、linear、ease-in、ease-out、ease-in-out、cubic-bezier)
// speed为动画速度（单位ms）
```
以上内容就是NProgress的用法了,是不是非常简单,大家动手实践一下很容易就明白了。
### 数据请求loading提示(Element-ui为例)
Element 提供了两种调用 Loading 的方法：指令和服务。对于自定义指令v-loading，只需要绑定Boolean即可。默认状况下，Loading 遮罩会插入到绑定元素的子节点，通过添加body修饰符，可以使遮罩插入至 DOM 中的 body 上。
![](https://user-gold-cdn.xitu.io/2019/9/2/16cf0f625aaba4be?w=2107&h=1656&f=gif&s=1523408)
* 自定义指令v-loading
```js
// 通常展示表格数据的时候,会添加一个loading提示,当数据完全请求回来时关闭loading提示
<template>
  <div class="app-container">
    <!-- 当前元素添加loading提示 -->
    <el-tabs type="border-card" v-model="activeKey" v-loading="loading">
      <el-tab-pane
        v-for="item of tabsLisgt"
        :key="item.key"
        :label="item.label"
        :name="item.name"
        :value="item.key"
      >
      <!-- 自定义的组件 -->
        <TabPane :tabsContent="filterstabsContent" :activeKey="activeKey" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import filtersDate from "@/utils/filtersTime";
import TabPane from "./components/TabPane";
export default {
  components: {
    TabPane
  },
  data() {
    return {
      // tabs标签列表
      tabsLisgt: [
        { label: "全部", key: "0" },
        { label: "一级权限", key: "1" },
        { label: "二级权限", key: "2" },
        { label: "三级权限", key: "3" }
      ],
      //   tabs标签页面内容
      tabsContent: [],
      activeKey: "1",
      loading: true
    };
  },
  computed: {
    // 根据tabs页面状态展示对应数据
    filterstabsContent() {
      if (this.activeKey === "0") {
        return this.tabsContent;
      } else {
        return this.tabsContent.filter(item => {
          return item.status === parseInt(this.activeKey);
        });
      }
    }
  },
  methods: {
    // 获取tabs页面展示内容
    async getTabsContent() {
      let result = await this.$getService("TabsService").getTabs();
      if (result && result.length > 0) {
        for (let i in result) {
          // 转换时间格式
          result[i].createTime = filtersDate(result[i].createTime);
        }
        this.tabsContent = result;
      }
      // 关闭loading显示
      this.loading = false;
    }
  },
  async mounted() {
    // 获取tabs页面展示内容
    await this.getTabsContent();
  }
};
</script>
```
* 服务方式
```js
// Loading 还可以以服务的方式调用。引入 Loading 服务
import { Loading } from 'element-ui';

// 在需要调用时：
Loading.service(options);

// 其中 options 参数为 Loading 的配置项，具体见下。
// LoadingService 会返回一个 Loading 实例,可通过调用该实例的 close 方法来关闭它：
let loadingInstance = Loading.service({ fullscreen: true });
this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
  loadingInstance.close();
})
```
在我的项目中,我是通过以下方式来实现的

```js
// 封装axios
import axios from 'axios'
import {API_BASE_URL} from '../config'
import store from '../store'
import {Loading} from 'element-ui'

var apiClient = axios.create({
  baseURL: API_BASE_URL
})
apiClient.defaults.withCredentials = true
// 封装请求
apiClient.interceptors.request.use(function (config) {
  // 开启loading提示
  let loadingInstance = Loading.service({ fullscreen: true })
  // 通过vuex来发起一个异步事件,保存当前开启状态和loading实例
  store.dispatch('loading', {loadingStatus: true, loadingInstance: loadingInstance})
  return config
}, function (error) {
  // 关闭loading提示
  store.dispatch('loading', {loadingStatus: false})
  return Promise.reject(error)
})
apiClient.interceptors.response.use(function (response) {
  // 关闭loading提示
  store.dispatch('loading', {loadingStatus: false})
  return response.data.data
}, function (error) {
  // 关闭loading提示
  store.dispatch('loading', {loadingStatus: false})
  return Promise.reject(error)
})

export { apiClient }

// actions.js
loading: function ({ commit }, data) {
  commit(types.LOADING, data)
}

// mutaions.js
[types.LOADING]: function (state, data) {
state.loadingStatus = data.loadingStatus
  if (!data.loadingStatus) {
    state.loadingInstance.close()
  } else {
    state.loadingInstance = data.loadingInstance
  }
}
```
以上就是通过Element-ui提供的两种loading显示案例,大家可以手动实践一下,方便理解
