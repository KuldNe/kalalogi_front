<template>
  <div>

    <fish-details :fishies="fishies" />

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
      fishies: [
        {
          speciesName: '',
          length: 0,
          weight: 0,
          date: '',
          locationName: '',
          released: false,
          comment: '',
          userName: ''
        }
      ]
    }
  },

  methods: {
    getFishies: function () {
      this.$http.get("/fish")
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

