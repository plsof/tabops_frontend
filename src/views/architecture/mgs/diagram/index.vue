<template>
  <div class="main">
    <div class="demo-image__preview">
      <p>MGS架构图</p>
      <el-image style="width: 350px; height: 350px" :src="url" :preview-src-list="srcList" />
    </div>
  </div>
</template>

<script>
import { getFiles } from '@/api/upload'

export default {
  name: 'MGSImage',
  data() {
    return {
      ip: 'http://172.188.2.89:8000',
      url: 'http://172.188.2.89:8000/media/mgs-ar.jpg',
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
          if (element['file'].indexOf('/media/mgs-') === 0) {
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
