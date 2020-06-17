<template>
  <div>
    <importExcel :xlsxInfo="xlsxInfo" @onXlsx="onXlsx" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      xlsxInfo: {
        data: [],
        dataRef: []
      }
    }
  },
  methods: {
    onXlsx (res) {
      console.log(res)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
