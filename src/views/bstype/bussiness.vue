<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom: 10px;">
      <el-select v-model="listQuery.btype" placeholder="类型" clearable style="width: 110px" class="filter-item">
        <el-option v-for="item in btypeOptions" :key="item.key" :label="item.key" :value="item.value" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <!-- <el-table-column label="ID" prop="id" sortable="custom" align="center" width="90px">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column> -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" class="demo-table-expand">
            <div v-if="scope.row.domain">
              <el-form-item
                v-for="(domain, index) in scope.row.domain.split(',')"
                :key="domain.key"
                :label="'域名' + index"
              >
                <span>{{ domain }}</span>
              </el-form-item>
            </div>
            <div v-else>
              <el-form-item>
                <span style="color:red">该业务没有域名或未配置域名</span>
              </el-form-item>
            </div>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="220px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="220px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.btype_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="220px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.comment }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="类型" prop="btype">
          <el-select v-model="temp.btype" class="filter-item" placeholder="Please select">
            <el-option v-for="item in btypeOptions" :key="item.key" :label="item.key" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item
          v-for="(domain, index) in dynamicValidateForm.domains"
          :key="domain.key"
          :label="'域名' + index"
          :prop="'domains.' + index + '.value'"
        >
          <table>
            <tr>
              <td style="width: 300px;"><el-input v-model="domain.value" /></td>
              <td><el-button @click.prevent="removeDomain(domain)">删除</el-button></td>
            </tr>
          </table>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="temp.comment" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button @click="addDomain">
          新增域名
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchBussiness, deleteBussiness, createBussiness, updateBussiness } from '@/api/bstype/bussiness'
import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'BussinessTable',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        btype: '',
        page: 1,
        limit: 20
        // sort: '+id'
      },
      btypeOptions: [
        { key: 'general', value: 0 },
        { key: 'local', value: 1 }
      ],
      temp: {
        id: undefined,
        name: '',
        btype: '',
        domain: '',
        comment: ''
      },
      dynamicValidateForm: {
        domains: [{
          value: ''
        }]
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        name: [{ required: true, message: 'name is required', trigger: 'change' }],
        btype: [{ required: true, message: 'btype is required', trigger: 'change' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchBussiness(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        btype: '',
        domain: '',
        comment: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const domainarr = []
          this.dynamicValidateForm.domains.forEach((item, index, array) => {
            domainarr.push(item['value'])
          })
          this.temp.domain = domainarr.toString()
          createBussiness(this.temp).then((response) => {
            this.temp.id = response.data.id
            this.temp.btype_name = response.data.btype_name
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dynamicValidateForm.domains = [] // 编辑diglog显示域名
      if (this.temp.domain) {
        this.temp.domain.split(',').forEach((item, index, array) => {
          this.dynamicValidateForm.domains.push({ 'value': item })
        })
      }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.temp.btype === 0) {
            this.temp['btype_name'] = 'general'
          } else {
            this.temp['btype_name'] = 'local'
          }
          const domainarr = []
          this.dynamicValidateForm.domains.forEach((item, index, array) => {
            domainarr.push(item['value'])
          })
          this.temp.domain = domainarr.toString()
          const tempData = Object.assign({}, this.temp)
          updateBussiness(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
      this.total = this.total - 1
      // 删除后端接口数据
      deleteBussiness(row.id).then(response => {
      })
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      })
    }
  }
}
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
