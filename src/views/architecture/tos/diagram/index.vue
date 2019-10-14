<template>
  <div class="main">
    <div class="demo-image__preview">
      <p>TOS架构图</p>
      <el-image style="width: 350px; height: 350px" :src="url" :preview-src-list="srcList" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TOSImage',
  data() {
    return {
      url: 'http://127.0.0.1:8000/media/architecture/base.jpg',
      srcList: [
        // 'http://127.0.0.1:8000/media/architecture/image.jpg',
        'http://127.0.0.1:8000/media/architecture/base.jpg'
      ]
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
