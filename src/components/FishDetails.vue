<template>
  <div>
    <div class="container" style="margin-top: 8px; margin-left: 8px; padding: 8px">
      <div @mouseover="showEdit=true" @mouseout="showEdit=false" class="align-items-center row text-white bg-dark">
        <div class="col">
          <img v-if="fish.picture==='' || fish.picture==null" src="../assets/images.png" class="img-thumbnail"
               width="200" height="200" alt="Kalapilt">
          <img v-else :src="fish.picture" class="img-thumbnail" width="200" height="200" alt="Kalapilt">
        </div>
        <div class="col">
          <div class="row justify-content-center">
            <div class="col">
              Kalaliik: {{ fish.speciesName }}
            </div>
          </div>
          <div class="row">
            <div class="col">
              Pikkus: {{ fish.length }} cm
            </div>
            <div class="col">
              kaal: {{ fish.weight }} g
            </div>
          </div>
          <div class="row">
            <div class="col">
              Kuupäev: {{ fish.date }}
            </div>
          </div>
          <div class="row justify-content-center">
            Püügikoht: {{ fish.locationName }}
          </div>
          <div v-if="fish.released" class="row justify-content-center">
            Vabastatud
          </div>
        </div>
        <div class="col-4">
          Kommentaar: {{ fish.comment }}
        </div>
        <div v-if="activeUsername===fish.userName" class="col-2">
          <div class="row">
          <div v-show="!showEdit" style="color:#198754">{{fish.userName}}</div>
          <div v-show="showEdit" class="col-4">
            <span>Muuda      </span>
            <router-link :to="{name: 'fishRoute', query: {fishId: fish.fishId }}">
              <font-awesome-icon class="fa-2xl" icon="fa-regular fa-pen-to-square"/>
            </router-link>
          </div>
          <div v-show="showEdit" class="col-2">
            <span>Kustuta      </span>
            <font-awesome-icon v-on:click="askDeleteFish" class="fa-2xl icon-button" icon="fa-regular fa-trash-can" style="color: crimson" />
          </div>
          </div>
        </div>
        <div v-else class="col">
          {{ fish.userName }}
        </div>
        <div>
          <AlertSuccess :message="messageSuccess"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: 'FishDetails',
  components: {AlertSuccess},

  props: {
    fish: {}
  },

  data: function () {
    return {
      activeUsername: sessionStorage.getItem('userName'),
      showEdit: false,
      fishId: this.$route.query.fishId,

      messageSuccess: '',
    }
  },

  methods: {

    askDeleteFish: function () {
      if(confirm('Oled sa kindel, et soovid kala kustutada?')) {
        this.deleteFish()
      } else {
      }
    },

    deleteFish: function () {
      this.$http.delete("/fish", {
            params: {
              fishId: this.fish.fishId
            }
          }
      ).then(response => {
        this.messageSuccess= 'Kala kustutatud!'
        setTimeout(() => {
          this.$router.go()
        }, 2000)
      }).catch(error => {
        console.log(error)
      })
    },
  }


}
</script>