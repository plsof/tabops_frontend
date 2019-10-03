<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom: 10px;">
      <el-input v-model="listQuery.lan_ip" placeholder="业务IP" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.roles" placeholder="角色" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.idc" placeholder="机房" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in idcOptions" :key="item.name" :label="item.name" :value="item.name" />
      </el-select>
      <el-select v-model="listQuery.platform" placeholder="Platform" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in platformOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.m_status" placeholder="Minion" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in minionOptions" :key="item.key" :label="item.key" :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.z_status" placeholder="Zabbix" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in zabbixOptions" :key="item.key" :label="item.key" :value="item.value" />
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
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-refresh" @click="handleScan('all')">
        扫描
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
      <el-table-column label="机房" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.idc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="业务IP" width="130px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.lan_ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Platform" width="105px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.platform }}</span>
        </template>
      </el-table-column>
      <el-table-column label="CPU核数" width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.num_cpus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="内存" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mem_total }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.roles }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Minion" class-name="status-col" width="100px" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.minion_status | statusFilter">
            {{ row.minion_status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Zabbix" class-name="status-col" width="100px" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.zabbix_status | statusFilter">
            {{ row.zabbix_status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230px" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="success" @click="handleScan(row)">
            扫描
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="80px" style="width: 400px; margin-left:50px;">
        <el-form-item label="机房" prop="idc">
          <el-select v-model="temp.idc" class="filter-item" placeholder="Please select">
            <el-option v-for="item in idcOptions" :key="item.name" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="机柜" prop="cabinet">
          <el-select v-model="temp.cabinet" class="filter-item" placeholder="Please select">
            <el-option v-for="item in cabinetOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="机架" prop="rack">
          <el-select v-model="temp.rack" class="filter-item" placeholder="Please select">
            <el-option v-for="item in rackOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="宿主机" prop="shost">
          <el-select v-model="temp.shost" class="filter-item" placeholder="Please select">
            <el-option v-for="item in shostOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item> -->
        <el-form-item label="SaltID" prop="salt_id">
          <el-input v-model="temp.salt_id" />
        </el-form-item>
        <el-form-item label="业务IP" prop="lan_ip">
          <el-input v-model="temp.lan_ip" />
        </el-form-item>
        <el-form-item label="管理IP" prop="man_ip">
          <el-input v-model="temp.man_ip" />
        </el-form-item>
        <el-form-item label="设备类型" prop="platform">
          <el-input v-model="temp.platform" />
        </el-form-item>
        <el-form-item label="主机名" prop="hostname">
          <el-input v-model="temp.hostname" />
        </el-form-item>
        <el-form-item label="Salt版本" prop="salt_version">
          <el-input v-model="temp.salt_version" />
        </el-form-item>
        <el-form-item label="系统指纹" prop="os_finger">
          <el-input v-model="temp.os_finger" />
        </el-form-item>
        <el-form-item label="SN号" prop="serial_number">
          <el-input v-model="temp.serial_number" />
        </el-form-item>
        <el-form-item label="CPU数量" prop="num_cpus">
          <el-input v-model="temp.num_cpus" />
        </el-form-item>
        <el-form-item label="内存大小" prop="mem_total">
          <el-input v-model="temp.mem_total" />
        </el-form-item>
        <!-- <el-form-item label="Salt状态" prop="m_status">
          <el-select v-model="temp.m_status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in minionOptions" :key="item.key" :label="item.key" :value="item.value" />
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="Zabbix" prop="z_status">
          <el-select v-model="temp.z_status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in zabbixOptions" :key="item.key" :label="item.key" :value="item.value" />
          </el-select>
        </el-form-item> -->
        <el-form-item label="角色" prop="roles">
          <el-input v-model="temp.roles" />
        </el-form-item>
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
import { fetchHost, createHost, updateHost, deleteHost } from '@/api/asset/host'
import { scan } from '@/api/salt'
import { refresh_agent } from '@/api/zabbix'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'HostTable',
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
      // cabinetOptions: [],
      // rackOptions: [],
      // shostOptions: [],
      platformOptions: ['VMware', 'physical'],
      minionOptions: [
        { key: 'Down', value: 0 },
        { key: 'Up', value: 1 },
        { key: 'None', value: 2 }
      ],
      zabbixOptions: [
        { key: 'Down', value: 0 },
        { key: 'Up', value: 1 },
        { key: 'None', value: 2 }
      ],
      temp: {
        // id: undefined,
        idc: undefined,
        // cabinet: '',
        // rack: '',
        // shost: '',
        salt_id: '',
        lan_ip: '',
        man_ip: undefined,
        platform: '',
        hostname: '',
        salt_version: '',
        osfinger: '',
        serial_number: '',
        num_cpus: undefined,
        mem_total: undefined,
        z_status: undefined,
        m_status: undefined,
        roles: '',
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
        lan_ip: [{ required: true, message: 'service is required', trigger: 'change' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
    this.getIdc()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchHost(this.listQuery).then(response => {
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
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        // id: undefined,
        idc: undefined,
        // cabinet: '',
        // rack: '',
        // shost: '',
        salt_id: '',
        lan_ip: '',
        man_ip: undefined,
        platform: '',
        hostname: '',
        salt_version: '',
        osfinger: '',
        serial_number: '',
        num_cpus: undefined,
        mem_total: undefined,
        z_status: undefined,
        m_status: undefined,
        roles: '',
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
          createHost(this.temp).then((response) => {
            this.temp.id = response.data.id
            this.temp.idc_name = response.data.idc_name
            this.temp.zabbix_status = 'None'
            this.temp.minion_status = 'None'
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
          const tempData = Object.assign({}, this.temp)
          updateHost(tempData).then(() => {
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
    handleScan(row) {
      if (row === 'all') {
        scan({ saltid: 'SCYD-*' }).then(response => {
          if (response.code === 0) {
            this.$notify({
              title: 'Success',
              message: 'Refresh Successfully minion ' + response.total,
              type: 'success',
              duration: 2000
            })
          }
        })
      } else {
        this.temp = Object.assign({}, row)
        scan({ saltid: row.salt_id }).then(response => {
          if (response.code === 0) {
            this.temp.idc = response.data['idc']
            this.temp.lan_ip = response.data['lan_ip']
            this.temp.man_ip = response.data['man_ip']
            this.temp.platform = response.data['platform']
            this.temp.hostname = response.data['hostname']
            this.temp.salt_version = response.data['salt_version']
            this.temp.os_finger = response.data['os_finger']
            this.temp.serial_number = response.data['serial_number']
            this.temp.num_cpus = response.data['num_cpus']
            this.temp.mem_total = response.data['mem_total']
            this.temp.roles = response.data['roles']
            this.temp.minion_status = response.data['minion_status']
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
        refresh_agent({ id: this.temp.id }).then(response => {
          if (response.code === 0) {
            this.temp.zabbix_status = response.data['zabbix_status']
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
          }
        })
      }
    },
    handleDelete(row) {
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
      this.total = this.total - 1
      // 删除后端接口数据
      deleteHost(row.id)
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
        const tHeader = ['idc', 'salt_id', 'lan_ip', 'num_cpus', 'mem_total', 'z_status', 'm_status', 'roles']
        const filterVal = ['idc', 'salt_id', 'lan_ip', 'num_cpus', 'mem_total', 'z_status', 'm_status', 'roles']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'host-list'
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
