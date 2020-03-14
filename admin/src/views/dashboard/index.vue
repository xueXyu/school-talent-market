<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎来到：《校园人才网管理后台》</div>
    <panel-group :props-data="siteCount" />
    <div v-if="lineChartData">
      <div class="tongji">网站每日数据增量统计表</div>
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <line-chart :chart-data="lineChartData" />
      </el-row>
    </div>
  </div>
</template>

<script>
import { siteCount, siteDailyIncrease } from '@/api/news'
import PanelGroup from '../public/PanelGroup'
import LineChart from '../public/LineChart'

export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      siteCount: null,
      lineChartData: null
      //   {
      //   xaxis_list: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      //   job_list: [120, 82, 91, 154, 162, 140, 145],
      //   user_list: [180, 160, 151, 106, 145, 150, 130],
      //   resume_list: [120, 90, 100, 138, 142, 130, 130],
      //   company_list: [100, 52, 31, 124, 112, 130, 150]
      // }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      siteCount().then(res => {
        this.siteCount = res.data
      })
      siteDailyIncrease().then(res => {
        this.lineChartData = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
      text-align: center;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

  .tongji {
    font-size: 20px;
    margin: 12px 0;
  }
</style>
