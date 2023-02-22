<template>
  <div>
  <div v-for="page in totalPages" :key="page">
    <span>{{ page }}</span>
  </div>
  </div>
</template>

<script>


export default {
  name: "TestView",
  components: {},
  data: function () {
    return {
       totalPages:10

      }
    }
  }
</script>

