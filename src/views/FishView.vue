<template>
  <div>
    <div>

      <div id="view" class="col-5 bg-dark just rounded-2" style="margin-top: 100px; margin-left: 30px; padding: 30px">
        <AlertSuccess :message="messageSuccess"/>
        <AlertDanger :message="messageWarning"/>
        <form class="px-4 py-3">
          <span>Püügikoht: {{ this.locationName }}</span>
          <br>
          <span>{{ this.fish.date }}</span>
          <br>
          <span>Kalaliik</span>
          <select v-model="fish.speciesId" class="form-select" aria-label="Default select example">
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

          <br>
          <div class="input-group">
            <span class="input-group-text">Kommentaar</span>
            <textarea v-model="fish.comment" maxlength="1000" style="overflow-y: auto; height: 100px" > </textarea>

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
    <div id="view" class="col-5  bg-dark just rounded-2" style="margin-top: 10px; margin-left: 30px; padding: 30px">
      <span>Lisa pilt: </span>
      <image-input @emitBase64Event="emitBase64"/>
    </div>
    <br>
    <div v-if="isEdit" class="justify-content-end col-10">
      <button v-on:click="editFish" type="button" class="btn btn-dark">Muuda kala</button>
    </div>

    <div v-else class="justify-content-end col-10">
      <button v-on:click="addFish" type="button" class="btn btn-dark">Lisa kala</button>
    </div>


  </div>
</template>

<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";
import ImageInput from "@/components/ImageInput.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";


export default {
  name: "FishView",
  components: {AlertSuccess, ImageInput, AlertDanger},
  data: function () {
    return {
      isEdit: null,

      species: [
        {
          speciesId: 0,
          speciesName: '',
        }
      ],

      locationName: '',
      fishId: this.$route.query.fishId,

      fish: {
        catchId: this.$route.query.catchId,
        comment:"",
        date:"",
        isPublic:true,
        length:'',
        picture:"",
        released:false,
        speciesId:null,
        weight:''

      },

      messageWarning: '',
      messageSuccess: ''
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

    prefillByCatchOrFish: function () {
      if (this.$route.query.catchId != null) {
        this.isEdit = false
        this.getCatch()
      } else {
        this.isEdit = true
        this.getFish()
      }
    },

    getCatch: function () {
      this.$http.get("/catch", {
            params: {
              catchId: this.fish.catchId
            }
          }
      ).then(response => {
        this.locationName = response.data.waterbodyName
        this.fish.date = response.data.catchDate

      }).catch(error => {
        console.log(error)
      })
    },

    getFish: function () {
      this.$http.get("/fish", {
            params: {
              fishId: this.fishId,
            }
          }
      ).then(response => {
        this.fish = response.data
        this.getCatch()
      }).catch(error => {
        console.log(error)
      })
    },

    addFish: function () {
      this.$http.post("/fish", this.fish
      ).then(response => {
        this.messageSuccess = 'Kala edukalt lisatud!'
        this.$router.go()

      }).catch(error => {
        console.log(error)
      })
    },

    editFish: function () {
      this.$http.put("/fish", this.fish, {
            params: {
              fishId: this.fishId,
            }
          }
      ).then(response => {
        this.$router.push({name: 'userFishRoute', query: {catchId: this.fish.catchId }} )
      }).catch(error => {
        console.log(error)
      })
    },


    emitBase64: function (pictureDataBase64) {
      this.fish.picture = pictureDataBase64
    }

  },

  beforeMount() {
    this.getSpecies()
    this.prefillByCatchOrFish()
  }
}
</script>

<style scoped>

</style>