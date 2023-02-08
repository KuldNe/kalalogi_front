<template>
  <div id="app">

    <div class="col">
      <nav>
        <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark  shadow p-3 mb-5 " style="height: 100%">
          <img src="https://i.fbcd.co/products/original/4dd08023a2500a7efaf141af098d33ad7832bd3f45350ff0df4a4e317a62ce83.jpg" alt="" width="32" height="32" class="rounded-circle me-2">
          <strong><span class="fs-4 align-items-center">Kalalogi</span></strong>
          <hr>
          <div class="d-grid gap-2">
            <button type="button" class="btn btn-secondary btn-sm">
              <router-link to="/">Püügiandmed</router-link>
            </button>
            <button type="button" class="btn btn-secondary btn-sm">
              <router-link to="/login">Logi sisse/ Registreeru </router-link>
            </button>
          </div>

          <hr>
          <div class="dropdown">
            <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
               id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <span>Filtreeri</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
<!--              <li><a class="dropdown-item" href="#">New project...</a></li>-->
<!--              <li><button type="button" class="btn btn-outline-light">Light</button></li>-->
              <a v-on:click="alerttest" class="dropdown-item">Kuupäev</a>
              <a v-on:click="alerttest" class="dropdown-item">Püügikoht</a>
              <a v-on:click="alerttest" class="dropdown-item">Kalaliik</a>

            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div id="main">
      <router-view/>
    </div>

  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#main {
  margin-left: 280px;
}

nav {
  padding: 0px;
  background-color: azure;

  position: fixed;
  width: 280px;
  z-index: 1000;
  left: 0;
  top: 0;
  border-right: 1px solid #162636;
  height: 100%;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: white;
}
</style>


<script>

import CatchDetails from "@/components/CatchDetails.vue";

export default {
  name: 'AppView',
  components: {CatchDetails},
  methods: {
    alerttest: function () {
      alert('test')
    }
  }
}
</script>