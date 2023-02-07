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
      catches: {
        species: [
          {
            speciesName:''
          },
        ],
        length: 0,
        weight: 0,
        catchDate: '10-09-22',
        waterbody: [
          {
            waterbodyName: ''
          }
        ],
        userComment: '',
        wasReleased: true,
        picture: ''
      }
    }
  }
}
</script>

