<template>
  <div>
    <div v-if="!hasFish">
      <img src="../assets/nofishforund.gif"/>
    </div>

    <div v-if="hasFish">
      <Paginator :total-pages="fishDisplay.totalPages" :page-no="pageNo"/>
      <div v-for="fish in fishDisplay.fishies">
        <fish-details :fish="fish" :key="fish.fishId"/>
      </div>
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
    },
    fishDisplay: function () {
      this.checkFish()
    },

  },

  data: function () {
    return {
      fishDisplay: {
        totalPages: 0,
        fishies: []
      },

      hasFish: true,

      pageNo: 1,
      perPage: 4
    }
  },

  methods: {
    checkFish: function () {
      this.hasFish = this.fishDisplay.fishies.length > 0
    },
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
      this.pageNo = pageNo
    }
  },

  beforeMount() {
    this.getFishies()
  }

}
</script>

