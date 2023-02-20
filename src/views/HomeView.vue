<template>
  <div>

    <div v-for="fish in fishies">
      <fish-details :fish="fish"/>
    </div>

    <div class="col">
      <span> <font-awesome-icon icon="fa-solid fa-angles-left"/> </span>
      <span> <font-awesome-icon icon="fa-solid fa-angles-right"/> </span>
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
    filterLocationId: Number,
    filterSpeciesId: Number,
  },
  watch: {
    filterLocationId: function () {
      this.getFishies()
    },
    filterSpeciesId: function () {
      this.getFishies()
    },
  },

  data: function () {
    return {
      fishies: [],

    }
  },

  methods: {

    getFishies: function () {
      this.$http.get("/fishies", {
            params: {
              waterbodyId: this.filterLocationId,
              speciesId: this.filterSpeciesId
            }
          }
      ).then(response => {
        this.fishies = response.data
      }).catch(error => {
        console.log(error)
      })
    },
  },

  beforeMount() {
    this.getFishies()
  }

}
</script>

