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
import FishDetails from "@/components/FishDetails.vue";

export default {
  name: "UserFishView",
  components: {FishDetails},
  props: {
    fishFilters: {}
  },

  data: function () {
    return {
      fishies: [],
      userId: sessionStorage.getItem('userId'),
      catchId: this.$route.query.catchId,

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
              userId: this.userId
            }
          }
      ).then(response => {
        this.fishies = response.data
      }).catch(error => {
        console.log(error)
      })
    },

    getCatchFish: function () {
      this.$http.get("/catch/fish", {
            params: {
              catchId: this.catchId
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
