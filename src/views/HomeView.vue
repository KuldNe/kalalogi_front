<template>
  <div>

    <div v-for="fish in fishDisplay.fishies">
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
      fishDisplay: {
        totalPages: Number,
        fishies: []
      },


      pageNo:2,
      perPage:5
    }
  },

  methods: {

    getFishies: function () {
      this.$http.get("/fishies", {
            params: {
              waterbodyId: this.filterLocationId,
              speciesId: this.filterSpeciesId,
              pageNo: this.pageNo,
              perPage: this.perPage
            }
          }
      ).then(response => {
        this.fishDisplay = response.data
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

