<template>
  <div>
    <Paginator :total-pages="fishDisplay.totalPages" :page-no="pageNo"/>
    <div v-for="fish in fishDisplay.fishies">
      <fish-details :fish="fish" :key="fish.fishId"/>
    </div>

  </div>
</template>

<script>

// @ is an alias to /src
import FishDetails from "@/components/FishDetails.vue";
import Paginator from "@/components/Paginator.vue";

export default {
  name: 'HomeView',
  components: {Paginator, FishDetails},
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
    pageNo: function () {
      this.getFishies()
    }
  },

  data: function () {
    return {
      fishDisplay: {
        totalPages: Number,
        fishies: []
      },

      pageNo: 1,
      perPage: 4
    }
  },

  methods: {

    getFishies: function () {
      this.$http.get("/fishies", {
            params: {
              waterbodyId: this.filterLocationId,
              speciesId: this.filterSpeciesId,
              pageNo: this.pageNo - 1,
              perPage: this.perPage
            }
          }
      ).then(response => {
        this.fishDisplay = response.data
      }).catch(error => {
        console.log(error)
      })
    },

    setPageNo: function (pageNo) {
      this.pageNo= pageNo
    }
  },

  beforeMount() {
    this.getFishies()
  }

}
</script>

