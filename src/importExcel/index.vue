<template>
<div class="importExcelBox">
  <input ref="importExcel" name="importExcel" class="importExcel" type="file" @change="importfxx" accept=".xlsx,.xls,.csv" />
  <button :style="inputStyle">{{xlsxInfo.buttonName || '导入Excel'}}</button>
  <span v-if="!xlsxInfo.fileNameHidde && xlsxInfo.name">{{xlsxInfo.name}}</span>
</div>
</template>

<script>
import XLSX from "xlsx"
export default {
  name: "importExcel",
  props: {
    xlsxInfo: {
      type: Object,
      default: () => ({
        data: [],
        dataRef: [],
        fileNameHidde: false
      })
    }
  },
  data() {
    return {
      inputStyle: `
        outline: none;
        color: #ffffff;
        padding: 3px 7px;
        margin: 3px;
        border: 1px solid #409eff;
        background-color: #409eff;
        border-radius: 3px;
      `
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init () {
      this.setStyle()
    },
    importfxx (e) {
      const files = e.target.files
      if (files && files[0]) {
        this.filePro(files[0], (data, dataRef) => {
          this.xlsxInfo.data = data || []
          this.xlsxInfo.dataRef = dataRef || []
          this.$set(this.xlsxInfo, 'name', files[0].name || '')
          this.xlsxInfo.size = files[0].size || 0
          this.onXlsx(this.xlsxInfo)
        })
      }
    },
    filePro (file, callback) {
      const make_cols = refstr =>
        Array(XLSX.utils.decode_range(refstr).e.c + 1)
          .fill(0)
          .map((x, i) => ({
            name: XLSX.utils.encode_col(i),
            key: i
          }))

      const reader = new FileReader()
      reader.onload = e => {
        const bstr = e.target.result
        const wb = XLSX.read(bstr, {
          type: "binary"
        })
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        const data = XLSX.utils.sheet_to_json(ws, {
          header: 1
        })
        callback(data, make_cols(ws["!ref"]))
      }
      file && reader.readAsBinaryString(file)
    },
    onXlsx (res) {
      this.$emit('onXlsx', res)
    },
    setStyle () {
      if (this.xlsxInfo.inputStyle) {
        const styleKey = Object.keys(this.xlsxInfo.inputStyle)
        this.inputStyle += styleKey.map(key => {
          return `${key}: ${this.xlsxInfo.inputStyle[key]}`
        }).join(";")
      }
    }
  }
};
</script>

<style>
.importExcelBox{
  position: relative;
  display: inline-block;
  overflow: hidden;
}
.importExcel {
  position: absolute;
  font-size: 200px;
  right: 0;
  top: 0;
  opacity: 0;
}
</style>
