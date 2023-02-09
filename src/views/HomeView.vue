<template>
  <div>
  <div>
    <fish-details />
  </div>

  </div>
</template>

<script>
// @ is an alias to /src


import FishDetails from "@/components/FishDetails.vue";

export default {
  name: 'HomeView',
  components: {FishDetails}
}
</script>

<style>
#home {
  background-color: dimgray;
}
</style>
