<template>
 <div>
  <div class="container m-3 p-3 ">
    <AlertDanger :message="message" />
    <div class="align-items-center row text-white bg-dark" style="margin-top: 10px; margin-left: 10px; padding: 10px">
      <div class="col-2">
        <span>Kuupäev</span>
        <input v-model="date" id="startDate" class="form-control" type="date" />
      </div>

      <div class="col-5">
        <span>Püügikoht</span>
        <select v-model="locationId" class="form-select" aria-label="Default select example">
          <option v-for="location in locations" :value="location.locationId">{{ location.locationName }}</option>
        </select>
      </div>
      <div class="col">
        <span>Lisa püük                </span>
        <font-awesome-icon v-on:click="checkAndAddCatch" class="fa-2xl icon-button" icon="fa-regular fa-square-check" />
      </div>
    </div>
  </div>

   <div class="container m-3 p-3">
     <div class="align-items-center row text-white bg-dark" style="margin-top: 10px; margin-left: 10px; padding: 15px">
       <div class="col-2">
         <span>Kuupäev:     </span>
         <span>Date</span>
       </div>

       <div class="col-5">
         <span>Püügikoht:    </span>
         <span>Mingi järv</span>
       </div>
       <div class="col-2">
         <span>Muuda      </span>
         <font-awesome-icon class="fa-2xl" icon="fa-regular fa-pen-to-square" />
       </div>
       <div class="col-2">
         <span>Lisa kala      </span>
         <router-link to="/fish"> <font-awesome-icon class="fa-2xl" icon="fa-regular fa-square-plus"/> </router-link>
       </div>
     </div>
   </div>

 </div>
</template>

<script>

import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: "CatchesView",
  components: {AlertDanger},
  data: function () {
    return {
      locations: [
        {
          locationId: 0,
          locationName: '',
          latitude: '',
          longitude: ''
        }
      ],
      message: '',
      locationId: 0,
      date: '',
      userId: sessionStorage.getItem('userId')
    }
  },

  methods: {
    getAllLocations: function () {
      this.$http.get("/waterbodies")
          .then(response => {
            this.locations = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },

    checkAndAddCatch: function () {
      if (this.date !=='' && (this.userId != null) && (this.locationId !== 0))
      {
            this.addCatch()
      } else {
        this.message = 'Täida kõik väljad!'
      }

    },


    addCatch: function () {
      this.$http.post("/catch", {
        date: this.date,
        userId: this.userId,
        waterbodyId: this.locationId
          }
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }

  },
  beforeMount() {
    this.getAllLocations()
  }

}
</script>

