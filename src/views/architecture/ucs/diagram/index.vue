<template>
  <div class="main">
    <div class="demo-image__preview">
      <p>UCS架构图</p>
      <el-image style="width: 350px; height: 350px" :src="url" :preview-src-list="srcList" />
    </div>
  </div>
</template>

<script>
import { getFiles } from '@/api/upload'

export default {
  name: 'UCSImage',
  data() {
    return {
      ip: 'http://127.0.0.1:8000',
      url: 'http://127.0.0.1:8000/media/ucs-ar.jpg',
      srcList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getFiles().then(response => {
        response.data.forEach(element => {
          if (element['file'].indexOf('/media/ucs-') === 0) {
            this.srcList.push(this.ip + element['file'])
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .main {
    text-align: center;
    line-height: 100px;
  }
</style>
