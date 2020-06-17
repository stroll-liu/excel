// 导出 csv
export async function exportCSV ({ header = [], filterKey = [], list = [] }) {
  const mainStr = []
  mainStr.push(header.join("\t,")+"\n")
  list.forEach( item => {
    const temp = []
    filterKey.forEach(el => {
      temp.push(item[el])
    })
    mainStr.push(temp.join("\t,")+"\n")
  })

  const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(mainStr.join(""))
  let link = document.createElement('a')
  link.href = uri
  link.download = `${Math.random().toString(36).slice(-8)}-${new Date().getTime()}.csv`
  document.body.appendChild(link)
  link.click()
}

// 导出 excel
import { export_json_to_excel } from './core/Export2Excel'
export async function exportExcel ({ tableJson = [], filename, bookType }) {
  function formatJson (filterKey, jsonData) {
    return jsonData.map(v => filterKey.map(j => v[j]))
  }

  const header = []
  const data = []
  const sheetname = []
  const multiHeader = []
  const merges = []

  tableJson.forEach((item, i) => {
    header.push(item.header || item.filterKey || [])
    merges.push(item.merges || [])
    multiHeader.push(item.multiHeader || [])
    data.push(formatJson(item.filterKey, item.list || []))
    sheetname.push(item.sheetName || `${Math.random().toString(36).slice(-8)}-${new Date().getTime()}-${i}`)
  })

  export_json_to_excel({
    multiHeader,
    header,
    data,
    sheetname,
    merges,
    bookType,
    filename: filename || `${Math.random().toString(36).slice(-8)}-${new Date().getTime()}`
  })
}

// 导入 Excel
import imExcel from './src/importExcel/index.vue'

export const importExcel = imExcel

export default {
  install: Vue => {
    Vue.component(importExcel.name, importExcel)
    Vue.prototype.$exportCSV = exportCSV
    Vue.prototype.$exportExcel = exportExcel
  }
}
