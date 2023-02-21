<template>
  <div>
    <div class="container m-3 p-3 ">
      <NewCatch :user-id="userId"/>
    </div>


    <div class="container m-3 p-3">
      <div v-for="aCatch in catches" :key="aCatch.catchId">
        <CatchDetails :locations="locations" :aCatch="aCatch"/>
      </div>
    </div>
  </div>
</template>

<script>


import NewCatch from "@/components/NewCatch.vue";
import CatchDetails from "@/components/CatchDetails.vue";

export default {
  name: "CatchesView",
  components: {CatchDetails, NewCatch},
  data: function () {
    return {
      addLocationVisible: false,

      catches: [
        {
          catchId: 0,
          catchDate: '',
          waterbodyId: 0,
          waterbodyName: '',
          latitude: '',
          longitude: ''
        }
      ],


      locations: [
        {
          locationId: 0,
          locationName: '',
          latitude: '',
          longitude: ''
        }
      ],
      locationId: 0,
      date: '',
      userId: sessionStorage.getItem('userId')
    }
  },

  methods: {

    getUserCatches: function () {
      this.$http.get("/catches", {
            params: {
              userId: this.userId,
            }
          }
      ).then(response => {
        this.catches = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    getAllLocations: function () {
      this.$http.get("/waterbodies")
          .then(response => {
            this.locations = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },


  },
  beforeMount() {
    this.getUserCatches()
    this.getAllLocations()
  }

}
</script>

