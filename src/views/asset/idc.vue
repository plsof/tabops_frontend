<template>
  <div class="app-container">
    <div class="filter-container" style="margin-right: 10px; margin-bottom: 10px; float:right">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">
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
      <el-table-column label="名称名" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="运营商" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.isp_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="带宽" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bandwidth }}</span>
        </template>
      </el-table-column>
      <el-table-column label="机柜数量" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cabinet_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
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
        <el-form-item label="地址" prop="address">
          <el-input v-model="temp.address" />
        </el-form-item>
        <el-form-item label="运营商" prop="isp">
          <el-select v-model="temp.isp" class="filter-item" placeholder="Please select">
            <el-option v-for="item in ispOptions" :key="item.key" :label="item.key" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="带宽" prop="bandwidth">
          <el-input v-model="temp.bandwidth" />
        </el-form-item>
        <el-form-item label="机柜数量" prop="cabinet_num">
          <el-input v-model="temp.cabinet_num" />
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
import { fetchIdc, deleteIdc, createIdc, updateIdc } from '@/api/asset/idc'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'IdcTable',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      ispOptions: [
        { key: '移动', value: 0 },
        { key: '电信', value: 1 },
        { key: '联通', value: 2 }
      ],
      temp: {
        id: undefined,
        name: '',
        address: '',
        isp: '',
        bandwidth: '',
        cabinet_num: '',
        comment: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        name: [{ required: true, message: 'name is required', trigger: 'change' }],
        address: [{ required: true, message: 'address is required', trigger: 'change' }],
        isp: [{ required: true, message: 'isp is required', trigger: 'blur' }]
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
      fetchIdc(this.listQuery).then(response => {
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
        address: '',
        isp: '',
        bandwidth: '',
        cabinet_num: '',
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
          createIdc(this.temp).then((response) => {
            this.temp.id = response.data.id
            this.temp.isp_name = response.data.isp_name
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
          if (this.temp.isp === 0) {
            this.temp['isp_name'] = '移动'
          } else if (this.temp.isp === 1) {
            this.temp['isp_name'] = '电信'
          } else {
            this.temp['isp_name'] = '联通'
          }
          const tempData = Object.assign({}, this.temp)
          updateIdc(tempData).then(() => {
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
      deleteIdc(row.id).then(response => {
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
