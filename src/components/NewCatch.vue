<template>
  <div>
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
        <span>Lisa asukoht  </span>

        <font-awesome-icon v-if="addLocationVisible" v-on:click="newLocationToggle" class="fa-xl icon-button"
                           icon="fa-solid fa-angles-up"/>
        <font-awesome-icon v-else v-on:click="newLocationToggle" class="fa-xl icon-button"
                           icon="fa-solid fa-angles-down"/>

      </div>
      <div class="col">
        <span>Lisa püük                </span>
        <font-awesome-icon v-on:click="checkAndAddCatch" class="fa-2xl icon-button"
                           icon="fa-regular fa-square-check"/>
      </div>

      <div v-if="addLocationVisible" class="row">
        <newLocation @emitAddLocationSuccess="newLocationOff"/>
      </div>


    </div>
  </div>
</template>
<script>
import NewLocation from "@/components/NewLocation.vue"
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
export default {
  name: 'NewCatch',
  components: {NewLocation, AlertSuccess, AlertDanger},
  props: {
    userId: null
  },
  data: function () {
    return {
      messageDanger: '',
      messageSuccess: '',

      locations: [],

      addLocationVisible: false,

      date: '',
      locationId: 0,

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
      }, timeOut)
    },

    newLocationOff: function () {
      this.addLocationVisible = false
    },
    newLocationToggle: function () {
      this.addLocationVisible = !this.addLocationVisible
    },
  },
  beforeMount() {
    this.getAllLocations()
  }
}
</script>