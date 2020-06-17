# excel
导入/导出excel

## 安装
```js
npm i @stroll/excel

```

## 引入
```js
import Vue from 'vue'

import Excel from '@stroll/excel'
Vue.use(Excel)
//  or
import { exportExcel, exportCSV, importExcel } from '@stroll/excel'
Vue.prototype.$exportCSV = exportCSV
Vue.prototype.$exportExcel = exportExcel
Vue.component('importExcel', importExcel)



```

## 调用
```js

importExcel()

// 导出 csv
// tHeader 数组, 表头
// filterKey 数组， 需要导出的字段key
// list 数组， 需要导出的数组
this.$exportCSV({ tHeader, filterKey, list })

// 导出 Excel
// tableJson 数组，表设置 （支持多sheet）示例：[{header, multiHeader, merges, filterKey, list, sheetName}, {header, multiHeader, merges, filterKey, list, sheetName}]
  // header 数组，表头 示例：["序号", "标题", "作者", "服务"]
  // multiHeader 数组，二级表头，同 header
  // merges 数组， 合并单元格 示例：["A1:A2", "B1:B2", "C1:E1"]
  // filterKey 数组，过滤需要展示的字段 示例：["id", "title", "author", "reviewer"]
  // list 数组， 展示的数据 示例： [{...}, {...}, {...}]
  // sheetName 字符串，sheet名称
// filename 字符串，文件名称 默认 `${随机字符串}-${当前时间戳}`
// bookType 字符串，文件格式 默认 xlsx
this.$exportExcel({ tableJson, filename, bookType })

```
### 导入 Excel
````html
<template>
  <!-- 导入成功后在写入 xlsxInfo 变量，或使用 onXlsx 回调函数 操作数据 -->
  <importExcel :xlsxInfo="xlsxInfo" @onXlsx="onXlsx" />
</template>
````
````js
data () {
  return {
    xlsxInfo: {
      data: [], // 表格数据
      dataRef: [], // 表格坐标
      fileNameHidden: false, // 文件名是否展示，默认展示
      inputStyle: {border: '1px solid #409eff'} // 按钮样式
    }
  }
}
methods: {
  onXlsx (res) {
    console.log(res)
  }
}
````
