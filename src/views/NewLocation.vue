<template>
  <div style="background-color: #2c3e50">
    <div class="column input-group mb-3">
            <span class="input-group-text" :class="{'input-filled': (newLocation.name!=='')}">
            Asukoha nimetus
            </span>
      <input v-model="newLocation.locationName" class="form-control">
    </div>
    <div class="column input-group mb-3">
            <span class="input-group-text">
            Laius°
            </span>
      <input v-model="newLocation.latitude" class="form-control">
    </div>
    <div class="column input-group mb-3">
            <span class="input-group-text">
            Pikkus°
            </span>
      <input v-model="newLocation.longitude" class="form-control" type="number">
    </div>
    <button v-on:click="addLocation" class="btn btn-success btn-sm" type="button" style="margin-top: 4.2%">
      Lisa
    </button>
  </div>
</template>
<script>
export default {
  name: 'newLocation',
  data: function () {
    return {
      newLocation: {
        locationName: '',
        latitude: null,
        longitude: null
      },
    }
  },

  methods: {
    addLocation: function () {
      this.$http.post("/waterbodies", this.newLocation
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

  }
}
</script>

