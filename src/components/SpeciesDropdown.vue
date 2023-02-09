<template>
  <select class="form-select" aria-label="Default select example">
    <option v-for="fish in species" :value="fish.speciesId">{{ fish.speciesName }}</option>
  </select>
</template>

<script>
export default {
  name: "SpeciesDropdown",

  data: function () {
    return {
      species: [
        {
          speciesId: 0,
          speciesName: '',
        }
      ]
    }
  },
  methods: {

    getAllSpecies: function () {
      this.$http.get("/fish/species")
          .then(result => {
            this.species = result.data

          }).catch(reason => {
        // vaid siis kui status code EI OLE 200
      })
    },


  },

  beforeMount() {
    this.getAllSpecies()
  }

}
</script>
