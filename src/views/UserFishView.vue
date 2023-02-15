<template>
  <div>
    <fish-details :fishies="fishies"/>
  </div>


</template>

<script>
import FishDetails from "@/components/FishDetails.vue";


export default {
  name: "UserFishView",
  components: {FishDetails},

  data: function () {
    return {
      fishies: [],
      userId: sessionStorage.getItem(userId),
      catchId: 0,
    }
  },
  methods: {

    getFishies: function () {
      if (true) {
        this.getUserFish()
      } else {
        this.getCatchFish()
      }
    },

    getUserFish: function () {
      this.$http.get("/user/fish", {
            params: {
              userId: this.userId,
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
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },




  }
}
</script>
