<template>
  <div class="dashboard-editor-container">

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <zabbix-pie-chart :chart-data="zabbixPieChartData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <salt-pie-chart :chart-data="saltPieChartData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
import zabbixPieChart from './components/zabbixPieChart'
import saltPieChart from './components/saltPieChart'
import BarChart from './components/BarChart'
import { fetchHost } from '@/api/asset/host'

export default {
  name: 'DashboardAdmin',
  components: {
    LineChart,
    zabbixPieChart,
    saltPieChart,
    BarChart
  },
  data() {
    return {
      lineChartData: {
        vmwareData: [0, 0, 0, 0, 0, 0],
        physicalData: [0, 0, 0, 0, 0, 0]
      },
      saltPieChartData: [
        { value: 0, name: 'Down', itemStyle: { color: '#FF0000' }},
        { value: 0, name: 'Up', itemStyle: { color: '#02DF82' }},
        { value: 0, name: 'None', itemStyle: { color: '#E0E0E0' }}
      ],
      zabbixPieChartData: [
        { value: 0, name: 'Down', itemStyle: { color: '#FF0000' }},
        { value: 0, name: 'Up', itemStyle: { color: '#02DF82' }},
        { value: 0, name: 'None', itemStyle: { color: '#E0E0E0' }}
      ]
    }
  },
  created() {
    this.getList()
    this.getSaltStatus()
    this.getZabbixStatus()
  },
  methods: {
    getList() {
      fetchHost({ idc: 109, platform: 'VMware' }).then(response => {
        this.lineChartData.vmwareData.splice(0, 1, response.total)
      })
      fetchHost({ idc: 109, platform: 'physical' }).then(response => {
        this.lineChartData.physicalData.splice(0, 1, response.total)
      })
      fetchHost({ idc: 111, platform: 'VMware' }).then(response => {
        this.lineChartData.vmwareData.splice(1, 1, response.total)
      })
      fetchHost({ idc: 111, platform: 'physical' }).then(response => {
        this.lineChartData.physicalData.splice(1, 1, response.total)
      })
      fetchHost({ idc: 210, platform: 'VMware' }).then(response => {
        this.lineChartData.vmwareData.splice(2, 1, response.total)
      })
      fetchHost({ idc: 210, platform: 'physical' }).then(response => {
        this.lineChartData.physicalData.splice(2, 1, response.total)
      })
      fetchHost({ idc: 301, platform: 'VMware' }).then(response => {
        this.lineChartData.vmwareData.splice(3, 1, response.total)
      })
      fetchHost({ idc: 301, platform: 'physical' }).then(response => {
        this.lineChartData.physicalData.splice(3, 1, response.total)
      })
      fetchHost({ idc: 601, platform: 'physical' }).then(response => {
        this.lineChartData.physicalData.splice(4, 1, response.total)
      })
      fetchHost({ idc: 601, platform: 'physical' }).then(response => {
        this.lineChartData.physicalData.splice(4, 1, response.total)
      })
      fetchHost({ idc: 201, platform: 'physical' }).then(response => {
        this.lineChartData.physicalData.splice(5, 1, response.total)
      })
      fetchHost({ idc: 201, platform: 'physical' }).then(response => {
        this.lineChartData.physicalData.splice(5, 1, response.total)
      })
    },
    getSaltStatus() {
      fetchHost({ m_status: 0 }).then(response => {
        this.saltPieChartData[0].value = response.total
      })
      fetchHost({ m_status: 1 }).then(response => {
        this.saltPieChartData[1].value = response.total
      })
      fetchHost({ m_status: 2 }).then(response => {
        this.saltPieChartData[2].value = response.total
      })
    },
    getZabbixStatus() {
      fetchHost({ z_status: 0 }).then(response => {
        this.zabbixPieChartData[0].value = response.total
      })
      fetchHost({ z_status: 1 }).then(response => {
        this.zabbixPieChartData[1].value = response.total
      })
      fetchHost({ z_status: 2 }).then(response => {
        this.zabbixPieChartData[2].value = response.total
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
