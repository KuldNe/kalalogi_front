<template>
  <FishDetails/>
</template>

<script>

import FishDetails from "@/components/FishDetails.vue";

export default {
  name: "TestView",
  components: {FishDetails},
  data: function () {
    return {
        speciesName: '',
        length: 0,
        weight: 0,
        catchDate: '10-09-22',
        waterbody: '',
        userComment: '',
        wasReleased: true,
        picture: '',

      }
    }
  }
</script>

