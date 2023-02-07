<template>
  <div>
  <div style="margin-top: 8px; margin-left: 8px; padding: 8px">
    <catch-details />
  </div>
  <div style="margin-top: 8px; margin-left: 8px; padding: 8px">
    <catch-details />
  </div>
  <div style="margin-top: 8px; margin-left: 8px; padding: 8px">
    <catch-details />
  </div>
  <div style="margin-top: 8px; margin-left: 8px; padding: 8px">
    <catch-details />
  </div>
  <div style="margin-top: 8px; margin-left: 8px; padding: 8px">
    <catch-details />
  </div>
  <div style="margin-top: 8px; margin-left: 8px; padding: 8px">
    <catch-details />
  </div>


  </div>
</template>

<script>
// @ is an alias to /src


import CatchDetails from "@/components/CatchDetails.vue";

export default {
  name: 'HomeView',
  components: {CatchDetails}
}
</script>

<style>
#home {
  background-color: dimgray;
}
</style>
