<template>
  <div>
    <div v-for="fish in fishies">
      <div v-if="fishFilters.filterSpecies == null && fishFilters.filterLocation == null">
      <fish-details :fish="fish"/>
      </div>
      <div v-else-if="fishFilters.filterSpecies != null && fishFilters.filterLocation == null">
        <fish-details v-if="fishFilters.filterSpecies===fish.speciesName" :fish="fish"/>
      </div>
      <div v-else-if="fishFilters.filterSpecies == null && fishFilters.filterLocation != null">
        <fish-details v-if="fishFilters.filterLocation===fish.locationName" :fish="fish"/>
      </div>
      <div v-else>
        <fish-details v-if="fishFilters.filterLocation===fish.locationName
                            && fishFilters.filterSpecies===fish.speciesName" :fish="fish"/>
      </div>

    </div>
  </div>
</template>

<script>

// @ is an alias to /src
import FishDetails from "@/components/FishDetails.vue";

export default {
  name: 'HomeView',
  components: {FishDetails},
  props: {
    fishFilters: {}
  },

  data: function () {
    return {
      fishies: [],

    }
  },

  methods: {
    getFishies: function () {
      this.$http.get("/fishies")
          .then(response => {
            this.fishies = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
  beforeMount() {
    this.getFishies()
  }
}
</script>

