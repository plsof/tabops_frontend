<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom: 10px;">
      <el-input v-model="listQuery.ip" placeholder="IP地址" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.idc" placeholder="机房" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in idcOptions" :key="item.name" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.service" placeholder="服务" clearable style="width: 110px" class="filter-item">
        <el-option v-for="item in serviceOptions" :key="item.name" :label="item.name" :value="item.id" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
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
      <el-table-column label="机房" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.idc_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.service_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="IP地址" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="路径" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.path }}</span>
        </template>
      </el-table-column>
      <el-table-column label="端口" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.port }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="100" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.z_status | statusFilter">
            {{ row.z_status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="success" @click="handleRefresh(row)">
            刷新
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
        <el-form-item label="机房" prop="idc">
          <el-select v-model="temp.idc" class="filter-item" placeholder="Please select">
            <el-option v-for="item in idcOptions" :key="item.name" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="服务" prop="service">
          <el-select v-model="temp.service" class="filter-item" placeholder="Please select">
            <el-option v-for="item in serviceOptions" :key="item.name" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="IP地址" prop="ip">
          <el-input v-model="temp.ip" />
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="temp.path" />
        </el-form-item>
        <el-form-item label="端口" prop="port">
          <el-input v-model="temp.port" />
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item.key" :label="item.key" :value="item.value" />
          </el-select>
        </el-form-item> -->
        <el-form-item label="备注">
          <el-input v-model="temp.comment" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchIdc } from '@/api/asset/idc'
import { fetchService } from '@/api/bstype/service'
import { fetchCosEpg, createCosEpg, updateCosEpg, deleteCosEpg } from '@/api/architecture/cosepg'
import { refresh } from '@/api/zabbix'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'CosEpgArchitecture',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        Up: 'success',
        Down: 'danger',
        None: 'info'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        idc: undefined,
        service: undefined,
        ip: undefined
      },
      idcOptions: [],
      serviceOptions: [],
      statusOptions: [
        { key: 'Down', value: 0 },
        { key: 'Up', value: 1 },
        { key: 'None', value: 2 }
      ],
      temp: {
        // id: undefined,
        idc: '',
        service: '',
        ip: '',
        path: '',
        port: undefined,
        comment: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        idc: [{ required: true, message: 'idc is required', trigger: 'change' }],
        service: [{ required: true, message: 'service is required', trigger: 'change' }],
        ip: [{ required: true, message: 'ip is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
    this.getIdc()
    this.getService()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchCosEpg(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getIdc() {
      fetchIdc().then(response => {
        this.idcOptions = response.data
      })
    },
    getService() {
      fetchService().then(response => {
        this.serviceOptions = response.data.filter(element => {
          return element['name'].indexOf('cosepg-') === 0
        })
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        // id: undefined,
        idc: '',
        service: '',
        ip: '',
        path: '',
        port: undefined,
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
          createCosEpg(this.temp).then((response) => {
            this.temp.id = response.data.id
            this.temp.idc_name = response.data.idc_name
            this.temp.service_name = response.data.service_name
            this.temp.z_status = 'None'
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
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.idcOptions.some(element => {
            if (element.id === this.temp.idc) {
              this.temp.idc_name = element.name
            }
          })
          this.serviceOptions.some(element => {
            if (element.id === this.temp.service) {
              this.temp.service_name = element.name
            }
          })
          const tempData = Object.assign({}, this.temp)
          updateCosEpg(tempData).then((response) => {
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
    handleRefresh(row) {
      this.temp = Object.assign({}, row)
      refresh({ db: 'CosEpg', id: this.temp.id }).then(response => {
        if (response.code === 0) {
          this.temp.z_status = response.data['z_status']
          for (const v of this.list) {
            if (v.id === this.temp.id) {
              const index = this.list.indexOf(v)
              this.list.splice(index, 1, this.temp)
              break
            }
          }
          this.$notify({
            title: 'Success',
            message: 'Refresh Successfully',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    handleDelete(row) {
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
      this.total = this.total - 1
      // 删除后端接口数据
      deleteCosEpg(row.id).then(response => {
      })
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['id', 'idc', 'idc_name', 'service', 'service_name', 'ip', 'path', 'port', 'status', 'z_status', 'comment']
        const filterVal = ['id', 'idc', 'idc_name', 'service', 'service_name', 'ip', 'path', 'port', 'status', 'z_status', 'comment']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'cosepg-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
