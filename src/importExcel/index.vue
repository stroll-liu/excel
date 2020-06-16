<template>
  <input id="file" name="file" type="file" @change="importfxx" accept=".xlsx,.xls,.csv" />
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
        dataRef: []
      })
    }
  },
  data() {
    return {}
  },
  methods: {
    importfxx (e) {
      const files = e.target.files;
      if (files && files[0])
        this.filePro(files[0], (data, dataRef) => {
          this.xlsxInfo.data = data || []
          this.xlsxInfo.dataRef = dataRef || []
          this.onXlsx(this.xlsxInfo)
        })
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
      reader.readAsBinaryString(file)
    },
    onXlsx (res) {
      this.$emit('onXlsx', res)
    }
  }
};
</script>

<style>
</style>
