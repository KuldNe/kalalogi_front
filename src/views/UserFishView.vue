<template>
  <div>
    <Paginator :total-pages="fishDisplay.totalPages" :page-no="pageNo"/>
    <div v-for="fish in fishDisplay.fishies">
      <fish-details :fish="fish"/>
    </div>
  </div>
</template>


<script>
import FishDetails from "@/components/FishDetails.vue";
import Paginator from "@/components/Paginator.vue";

export default {
  name: "UserFishView",
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
        fishies: [],
        totalPages: Number
      },
      userId: sessionStorage.getItem('userId'),
      catchId: this.$route.query.catchId,

      pageNo: 1,
      perPage: 4
    }
  },

  methods: {

    getFishies: function () {
      if (this.catchId == null) {
        this.getUserFish()
      } else {
        this.getCatchFish()
      }
    },

    getUserFish: function () {
      this.$http.get("/user/fish", {
            params: {
              userId: this.userId,
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

    getCatchFish: function () {
      this.$http.get("/catch/fish", {
            params: {
              catchId: this.catchId,
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

<style scoped>

</style>