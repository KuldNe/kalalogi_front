<template>
  <CatchDetails/>
</template>

<script>

import CatchDetails from "@/components/CatchDetails.vue";

export default {
  name: "TestView",
  components: {CatchDetails},
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

