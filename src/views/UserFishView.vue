<template>
  <div>

    <div class="row" style="margin: 1% ">
      <div class="col" v-if="hasFish">
        <Paginator :total-pages="fishDisplay.totalPages" :page-no="pageNo"/>
      </div>
      <div v-if="showAddFish"  class="col">
        <span>Lisa kala      </span>
        <router-link :to="{name: 'fishRoute', query: {catchId: catchId}}">
          <font-awesome-icon class="fa-2xl" icon="fa-regular fa-square-plus"/>
        </router-link>
      </div>
    </div>
    <div v-if="!hasFish">
      <img src= "../assets/nofishforund.gif"/>
    </div>
    <div v-if="hasFish" v-for="fish in fishDisplay.fishies">
      <fish-details :fish="fish" :key="fish.fishId"/>
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
    },
    $route() {
      this.checkIfFishview()
      this.resetFishFilters()
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

      showAddFish: false,

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
      if (this.catchId == null) {
        this.getUserFish()
      } else {
        this.getCatchFish()
        this.showAddFish = true
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
        this.checkFish()
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
        this.checkFish()
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

<style scoped>

</style>