<template>
  <div class="app-container">
    <div class="upload">
      <el-upload class="upload-demo" action="http://127.0.0.1:8000/api/upload/">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
    <br>
    <br>
    <div class="pic_path">
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="文件路径" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.file }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button size="mini" type="danger" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getFiles, deleteFile } from '@/api/upload'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'UploadTable',
  directives: { waves },
  data() {
    return {
      list: null,
      listLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getFiles().then(response => {
        this.list = response.data

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleDelete(row) {
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
      // this.total = this.total - 1
      // 删除后端接口数据
      deleteFile(row.id).then(response => {
      })
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
    }
  }
}
</script>
