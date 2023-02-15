<template>
  <div style="background-color: #2c3e50">
    <alert-danger :message="messageDanger"/>
    <AlertSuccess :message="messageSuccess"/>
    <div class="column input-group mb-3">
            <span class="input-group-text" :class="{'input-filled': (newLocation.name!=='')}">
            Asukoha nimetus
            </span>
      <input v-model="newLocation.locationName" class="form-control">
    </div>
    <div class="column input-group mb-3">
            <span class="input-group-text">
            Laius°
            </span>
      <input v-model="newLocation.latitude" class="form-control" type="number">
    </div>
    <div class="column input-group mb-3">
            <span class="input-group-text">
            Pikkus°
            </span>
      <input v-model="newLocation.longitude" class="form-control" type="number">
    </div>
    <button v-on:click="addLocation" class="btn btn-success btn-sm" type="button" style="margin-top: 4.2%">
      Lisa
    </button>
  </div>
</template>
<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: 'newLocation',
  components: {AlertSuccess, AlertDanger},
  data: function () {
    return {
      newLocation: {
        locationName: '',
        latitude: null,
        longitude: null
      },

      messageDanger:'',
      messageSuccess: '',
    }
  },

  methods: {
    addLocation: function () {
      this.messageDanger = ''
      this.messageSuccess= ''

      this.$http.post("/waterbodies", this.newLocation
      ).then(response => {
        this.messageSuccess='Asukoht edukalt lisatud!'
        setTimeout(()=> {
          this.$emit('emitAddLocationSuccess', false)
          this.$router.go()
        }, 1000)
      }).catch(error => {
        if(error.response.data.status===400){
          this.messageDanger='Viga sisestamisel, kontrolli sisestatud andmete vormingut'
        }
      })
    }

  }
}
</script>

