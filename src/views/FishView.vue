<template>
  <div>
    <div>

      <div id="view" class="col-5 bg-dark just rounded-2" style="margin-top: 100px; margin-left: 30px; padding: 30px">
        <AlertDanger :message="message"/>
        <form class="px-4 py-3">
          <span>Püügikoht: {{this.locationName}}</span>
          <br>
          <span>Kuupäev: {{this.date}}</span>
          <br>
          <span>Kalaliik</span>
          <select v-model="species.speciesId" class="form-select" aria-label="Default select example">
            <option v-for="specie in species" :value="specie.speciesId">{{ specie.speciesName }}</option>
          </select>
          <br>
          <div class="input-group mb-3 col-2">
            <span class="input-group-text">pikkus</span>
            <input v-model="fish.length" type="number" min="0" class="form-control">
            <span class="input-group-text">cm</span>
          </div>
          <div class="input-group mb-3 col-2">
            <span class="input-group-text">kaal</span>
            <input v-model="fish.weight" type="number" min="0" class="form-control">
            <span class="input-group-text">kg</span>
          </div>
          <div class="input-group">
            <span class="input-group-text">Kommentaar</span>
            <textarea class="form-control" aria-label="With textarea"></textarea>
          </div>
          <br>
          <div>
            <span>Vabastatud    </span>
            <input v-model="fish.released" class="form-check-input" type="checkbox">
            <label class="form-check-label">
            </label>
          </div>
          <div>
            <span>Kuva avalikult    </span>
            <input v-model="fish.isPublic" class="form-check-input" type="checkbox">
            <label class="form-check-label">
            </label>
          </div>
        </form>
      </div>
    </div>
    <div id="view" class="col-5  bg-dark just rounded-2" style="margin-top: 100px; margin-left: 30px; padding: 30px">
      <div>
        <ImageInput @emitBase64Event="emitBase64"/>
      </div>
    </div>
    <br>
    <div class="justify-content-end col-10">
      <button type="button" class="btn btn-dark">Salvesta</button>
    </div>

  </div>
</template>

<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";
import ImageInput from "@/components/ImageInput.vue";

export default {
  name: "FishView",
  components: {ImageInput, AlertDanger},
  data: function () {
    return {
      species: [
        {
          speciesId: 0,
          speciesName: '',
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

      catchId: this.$route.query.catchId,
      locationName: '',

      fish: {
        date: '',
        speciesId: 0,
        length: 0,
        weight: 0,
        locationId: '',
        released: false,
        isPublic: true,
        message: '',
        picture: ''
      }
    }
  },

  methods: {
    getSpecies: function () {
      this.$http.get("/fish/species")
          .then(response => {
            this.species = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },

    getCatch: function () {
      this.$http.get("/catch", {
            params: {
              catchId: this.catchId
            }
          }
      ).then(response => {
        this.locationName = response.data.waterbodyName
        this.date = response.data.catchDate

      }).catch(error => {
        console.log(error)
      })
    },

    addFish: function () {
      {

      }

    },



    emitBase64: function (pictureDatabase64) {
      this.picture = pictureDatabase64
    },
 },
    beforeMount() {
      this.getSpecies()
      this.getCatch()
    }

}
</script>

