<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎来到：《校园人才网管理后台》</div>
    <panel-group :props-data="siteCount" />
  </div>
</template>

<script>
import { siteCount } from '@/api/news'
import PanelGroup from '../public/PanelGroup'

export default {
  name: 'Dashboard',
  components: {
    PanelGroup
  },
  data() {
    return {
      siteCount: null
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
</style>
