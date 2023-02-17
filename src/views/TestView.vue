<template>
  <div  class = "col-8 offset-2">
    <div class = "card">
<BarChart/>
  </div>
  </div>
</template>

<script>
import BarChart from "@/components/BarChart.vue";

export default {
  name: "TestView",
  components: {BarChart}
}
</script>

