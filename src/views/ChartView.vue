<template>
<div>
  <div>
  <BarChart/>
  </div>
  <div>
  <LineChart/>
  </div>
</div>
</template>

<script>
import BarChart from '@/components/BarChart.vue'
import LineChart from '@/components/LineChart.vue'

export default {
  name: "ChartView",
  components: {BarChart, LineChart}
}
</script>

