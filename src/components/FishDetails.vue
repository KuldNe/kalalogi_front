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
        <div v-if="activeUsername===fish.userName" class="col">
          <div v-show="!showEdit" style="color:#198754">{{fish.userName}}</div>
          <div v-show="showEdit" class="col">
            <span>Muuda      </span>
            <router-link :to="{name: 'fishRoute', query: {fishId: fish.fishId }}">
              <font-awesome-icon class="fa-2xl" icon="fa-regular fa-pen-to-square"/>
            </router-link>
          </div>
        </div>
        <div v-else class="col">
          {{ fish.userName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FishDetails',

  props: {
    fish: {}
  },

  data: function () {
    return {
      activeUsername: sessionStorage.getItem('userName'),
      showEdit: false
    }
  }

}
</script>