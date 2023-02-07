<template>
  <div class="justify-content-right">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Whatever"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
