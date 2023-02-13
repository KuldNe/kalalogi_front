<template>
  <div>
    <div class="container m-3 p-3 ">
      <AlertDanger :message="messageDanger"/>
      <AlertSuccess :message="messageSuccess"/>
      <div class="align-items-center row text-white bg-dark" style="margin-top: 10px; margin-left: 10px; padding: 10px">
        <div class="col-2">
          <span>Kuupäev</span>
          <input v-model="date" id="startDate" class="form-control" type="date"/>
        </div>

        <div class="col-5">
          <span>Püügikoht</span>
          <select v-model="locationId" class="form-select" aria-label="Default select example">
            <option v-for="location in locations" :value="location.locationId">{{ location.locationName }}</option>
          </select>
        </div>
        <div class="col">
          <span>Lisa püük                </span>
          <font-awesome-icon v-on:click="checkAndAddCatch" class="fa-2xl icon-button"
                             icon="fa-regular fa-square-check"/>
        </div>
        <div class="col-5">
          <div class="input-group mb-3">
            <span class="input-group-text" :class="{'input-filled': (newLocation.name!=='')}">
            Asukoha nimetus
            </span>
            <input v-model="newLocation.name" class="form-control">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" :class="{'input-filled': (newLocation.name!=='')}">
            Laius°
            </span>
            <input v-model="newLocation.latitude" class="form-control">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" :class="{'input-filled': (newLocation.name!=='')}">
            Pikkus°
            </span>
            <input v-model="newLocation.longitude" class="form-control">
          </div>

        </div>
      </div>


    </div>

    <div class="container m-3 p-3">
      <div v-for="acatch in catches" class="align-items-center row text-white bg-dark"
           style="margin-top: 10px; margin-left: 10px; padding: 15px">
        <div class="col-2">
          <span>Kuupäev: {{ acatch.catchDate }}</span>
        </div>

        <div class="col-5">
          <span>Püügikoht: {{ acatch.waterbodyName }}</span>
        </div>
        <div class="col-2">
          <span>Muuda      </span>
          <font-awesome-icon class="fa-2xl" icon="fa-regular fa-pen-to-square"/>
        </div>
        <div class="col-2">
          <span>Lisa kala      </span>
          <router-link :to="{name: 'fishRoute', query: {catchId: acatch.catchId}}">
            <font-awesome-icon class="fa-2xl" icon="fa-regular fa-square-plus"/>
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: "CatchesView",
  components: {AlertSuccess, AlertDanger},
  data: function () {
    return {
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

      newLocation: {
        name: '',
        latitude: '',
        longitude: ''
      },

      locations: [
        {
          locationId: 0,
          locationName: '',
          latitude: '',
          longitude: ''
        }
      ],
      messageDanger: '',
      messageSuccess: '',
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
      if (this.date !== '' && (this.userId != null) && (this.locationId !== 0)) {
        this.addCatch()
      } else {
        this.messageDanger = 'Täida kõik väljad!'
      }

    },


    addCatch: function () {
      this.$http.post("/catch", {
            date: this.date,
            userId: this.userId,
            waterbodyId: this.locationId
          }
      ).then(response => {
        this.messageSuccess = 'Püük edukalt lisatud'
        this.timeoutAndReloadPage(1000)
      }).catch(error => {
        console.log(error)
      })
    },

    timeoutAndReloadPage: function (timeOut) {
      setTimeout(() => {
        this.$router.go(0)
      }, timeOut);
    },

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

  },
  beforeMount() {
    this.getAllLocations()
    this.getUserCatches()
  }

}
</script>

