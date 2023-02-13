<template>
<div>
  <div>

    <div id="view" class="col-5 bg-dark just rounded-2" style="margin-top: 100px; margin-left: 30px; padding: 30px">
      <AlertDanger :message="message"/>
      <form class="px-4 py-3">
        <span>Kalaliik</span>
        <select v-model="speciesId" class="form-select" aria-label="Default select example">
          <option v-for="specie in species" :value="specie.speciesId">{{ specie.speciesName }}</option>
        </select>
        <br>
        <div class="input-group mb-3 col-2">
          <span class="input-group-text">pikkus</span>
          <input v-model="length" type="number" min="0" class="form-control">
          <span class="input-group-text">cm</span>
        </div>
        <div class="input-group mb-3 col-2">
          <span class="input-group-text">kaal</span>
          <input v-model="weight" type="number" min="0" class="form-control">
          <span class="input-group-text">kg</span>
        </div>
        <span>Püügikoht</span>
        <select v-model="locationId" class="form-select" aria-label="Default select example">
          <option v-for="location in locations" :value="location.locationId">{{ location.locationName }}</option>
        </select>
        <br>
        <div class="input-group">
          <span class="input-group-text">Kommentaar</span>
          <textarea class="form-control" aria-label="With textarea"></textarea>
        </div>
        <br>
        <div>
          <span>Vabastatud    </span>
          <input v-model="released" class="form-check-input" type="checkbox">
          <label class="form-check-label">
          </label>
        </div>
      </form>
    </div>
  </div>
  <div id="view" class="col-5  bg-dark just rounded-2" style="margin-top: 100px; margin-left: 30px; padding: 30px">
    <div>
      <span>Lisa pilt</span>
      <input type="file" v-on:change="" accept="image/x-png,image/jpeg,image/gif">
    </div>
  </div>
  <br>
<div class="justify-content-end col-10">
  <button type="button" class="btn btn-dark">Salvesta</button>
</div>

</div>
</template>

<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: "FishView",
  components: {AlertDanger},
  data: function () {
    return {
      species: [
        {
          speciesId: 0,
          speciesName: '',
        }
      ],
      locations: [
        {
          locationId: 0,
          locationName: '',
          latitude: '',
          longitude: ''
        }
      ],
      speciesId: 0,
      length: 0,
      weight: 0,
      locationId: '',
      released: false,
      message: ''

    }
  },

  methods: {
    getSpecies: function () {
      this.$http.get("/fish/species")
          .then(response => {
            this.species = response.data
          })
          .catch(error => {
            console.log(error)
          })
    }

  },

  beforeMount() {
    this.getSpecies()
  }
}
</script>

<style scoped>

</style>