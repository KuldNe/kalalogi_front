<template>
  <div>

    <div v-for="fish in fishies">
      <fish-details :fish="fish"/>
    </div>

    <div aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Eelmine</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">Järgmine</a>
        </li>
      </ul>
    </div>


  </div>
</template>

<script>

// @ is an alias to /src
import FishDetails from "@/components/FishDetails.vue";

export default {
  name: 'HomeView',
  components: {FishDetails},
  props: {
    filterLocationId: Number,
    filterSpeciesId: Number,
  },
  watch: {
    filterLocationId: function () {
      this.getFishies()
    },
    filterSpeciesId: function () {
      this.getFishies()
    },
  },

  data: function () {
    return {
      fishies: [],

    }
  },

  methods: {

    getFishies: function () {
      this.$http.get("/fishies", {
            params: {
              waterbodyId: this.filterLocationId,
              speciesId: this.filterSpeciesId
            }
          }
      ).then(response => {
        this.fishies = response.data
      }).catch(error => {
        console.log(error)
      })
    },
  },

  beforeMount() {
    this.getFishies()
  }

}
</script>

