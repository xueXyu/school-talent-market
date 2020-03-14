<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import resize from './mixins/resize'

  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '360px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.setOptions(val)
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(this.chartData)
      },
      setOptions(chartData) {
        this.chart.setOption({
          xAxis: {
            data: chartData.xaxis_list,
            boundaryGap: false,
            axisTick: {
              show: false
            }
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10]
          },
          yAxis: {
            axisTick: {
              show: true
            }
          },
          legend: {
            data: ['招聘职位', '求职者', '简历', '公司']
          },
          series: [
            {
              name: '招聘职位',
              data: chartData.job_list,
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#f4516c'
                }
              },
              animationDuration: 2800
            },
            {
              name: '求职者',
              data: chartData.user_list,
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#36a3f7'
                }
              },
              animationDuration: 2800
            },
            {
              name: '简历',
              data: chartData.resume_list,
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#FECE61'
                }
              },
              animationDuration: 2800
            },
            {
              name: '公司',
              data: chartData.company_list,
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#40c9c6'
                }
              },
              animationDuration: 2800
            }
          ]
        })
      }
    }
  }
</script>
