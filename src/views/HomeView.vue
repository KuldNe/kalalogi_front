<template>
  <div>
    <div v-for="fish in fishies">
    <fish-details :fish="fish" />
    </div>
  </div>
</template>

<script>

// @ is an alias to /src
import FishDetails from "@/components/FishDetails.vue";

export default {
  name: 'HomeView',
  components: {FishDetails},

  data:function () {
    return {
      fishies: []
    }
  },

  methods: {
    getFishies: function () {
      this.$http.get("/fishies")
          .then(response => {
            this.fishies = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
  beforeMount() {
    this.getFishies()
  }
}
</script>

