<template>
  <div style="background-color: #2c3e50">
    <alert-danger :message="messageDanger"/>
    <AlertSuccess :message="messageSuccess"/>
    <div class="column input-group mb-3">
            <span class="input-group-text" :class="{'input-filled': (previousLocation.name!=='')}">
            Asukoha nimetus
            </span>
      <input v-model="previousLocation.locationName" class="form-control">
    </div>
    <div class="column input-group mb-3">
            <span class="input-group-text">
            Laius°
            </span>
      <input v-model="previousLocation.latitude" class="form-control" type="number">
    </div>
    <div class="column input-group mb-3">
            <span class="input-group-text">
            Pikkus°
            </span>
      <input v-model="previousLocation.longitude" class="form-control" type="number">
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
      previousLocation: {
        date: '',
        waterbodyId: 0,
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

      this.$http.put("/catches", this.previousLocation
      ).then(response => {
        this.messageSuccess='Asukoht muudetud!'
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

