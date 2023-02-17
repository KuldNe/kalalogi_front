<template>
  <div>

    <div v-for="fish in fishies">
      <fish-details :fish="fish"/>
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
  //   getFishiesVana: function () {
  //     this.$http.get("/fishies")
  //         .then(response => {
  //           this.fishies = response.data
  //         })
  //         .catch(error => {
  //           console.log(error)
  //         })
  //   },

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

