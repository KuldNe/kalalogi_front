<template>
  <div>
    <Paginator :total-pages="fishDisplay.totalPages" :page-no="pageNo"/>
    <div v-for="fish in fishDisplay.fishies">
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
import Paginator from "@/components/Paginator.vue";

export default {
  name: 'HomeView',
  components: {Paginator, FishDetails},
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
    pageNo: function () {
      this.getFishies()
    }
  },

  data: function () {
    return {
      fishDisplay: {
        totalPages: Number,
        fishies: []
      },

      pageNo: 1,
      perPage: 4
    }
  },

  methods: {

    getFishies: function () {
      this.$http.get("/fishies", {
            params: {
              waterbodyId: this.filterLocationId,
              speciesId: this.filterSpeciesId,
              pageNo: this.pageNo - 1,
              perPage: this.perPage
            }
          }
      ).then(response => {
        this.fishDisplay = response.data
      }).catch(error => {
        console.log(error)
      })
    },

    setPageNo: function (pageNo) {
      this.pageNo= pageNo
    }
  },

  beforeMount() {
    this.getFishies()
  }

}
</script>

