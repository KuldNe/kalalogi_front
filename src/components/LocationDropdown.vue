<template>
  <select class="form-select" aria-label="Default select example">
    <option v-for="location in locations" :key="location.locationId" :value="location.locationId">{{ location.locationName }}</option>
  </select>
</template>

<script>
export default {
  name: "LocationDropdown",

  data: function () {
    return {
      locations: [
        {
          locationId: 0,
          locationName: '',
          longitude: 0,
          latitude: 0
        }
      ]
    }
  },
  methods: {

    getAllLocation: function () {
      this.$http.get("/fish/location")
          .then(result => {
            this.locations = result.data

          }).catch(reason => {
        // vaid siis kui status code EI OLE 200
      })
    },


  },

  beforeMount() {
    this.getAllLocation()
  }

}
</script>
