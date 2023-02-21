<template>
  <div id="app">

    <div class="col">
      <nav>
        <div
            class="text-white bg-dark shadow p-3 mb-5 " style="height: 100%">
          <img class="rounded-circle me-2" width="150" height="150" src="./assets/kalalogo.png" />

<!--          d-flex flex-column flex-shrink-0 p-3-->
<!--          <strong><span class="fs-4 align-items-center">Kalalogi</span></strong>-->
          <hr>
          <div class="d-grid gap-2">
            <button type="button" class="btn btn-secondary btn-sm">
              <router-link to="/">Püügiandmed</router-link>
            </button>
            <button v-if="!isUser && !isAdmin" type="button" class="btn btn-secondary btn-sm">
              <router-link to="/login">Logi sisse/ Registreeru</router-link>
            </button>
            <button v-if="isUser" type="button" class="btn btn-secondary btn-sm">
              <router-link to="/userfish">Minu kalad</router-link>
            </button>
            <button v-if="isUser" type="button" class="btn btn-secondary btn-sm">
              <router-link to="/catches">Minu püügid</router-link>
            </button>
            <button v-if="isUser || isAdmin" v-on:click="logout" type="button" class="btn btn-secondary btn-sm">
              Logi välja
            </button>

          </div>


          <hr>

          <div v-if="isHomeView" class="row">
            <span class="fs-6">Filtreeri:</span>

            <div class="btn-group">
              <button class="btn btn-secondary btn-sm" type="button" style="width: 80%">
                Püügikoht
              </button>
              <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split"
                      data-bs-toggle="dropdown" aria-expanded="false">
                <span class="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul class="dropdown-menu icon-button">
                <li class="dropdown-item" v-on:click="filterLocationId = 0">KÕIK</li>
                <li v-for="location in locations" :key="location.locationId" class="dropdown-item"
                    v-on:click="filterLocationId=location.locationId">
                  {{ location.locationName }}
                </li>

              </ul>
            </div>

            <br>

            <div class="btn-group">
              <button class="btn btn-secondary btn-sm" type="button" style="width: 80%">
                Kalaliik
              </button>
              <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split"
                      data-bs-toggle="dropdown" aria-expanded="false">
                <span class="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul class="dropdown-menu icon-button">
                <li class="dropdown-item" v-on:click="filterSpeciesId = 0 ">KÕIK</li>
                <li v-for="specie in species" :key="specie.speciesId" class="dropdown-item"
                    v-on:click="filterSpeciesId=specie.speciesId">
                  {{ specie.speciesName }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div id="main">
      <router-view :filter-location-id="filterLocationId" :filter-species-id="filterSpeciesId"  @emitLoginSuccessEvent="updateUserAndReload"/>
    </div>

  </div>
</template>

<script>


export default {
  name: 'AppView',
  data: function () {
    return {
      isUser: false,
      isAdmin: false,
      isHomeView: true,

      filterLocationId: 0,
      filterSpeciesId: 0,

      species: [
        {
          speciesId: null,
          speciesName: ''
        }
      ],

      locations: [
        {
          locationId: 0,
          locationName: '',
          latitude: '',
          longitude: ''
        }
      ]
    }
  },

  methods: {
    logout: function () {
      sessionStorage.clear()
      this.roleType = sessionStorage.getItem("roleType")
      this.$router.push({name: 'homeRoute'})
      this.$router.go()
    },
    updateUserAccess: function () {
      sessionStorage.getItem("roleType") === 'user' ? this.isUser = true : this.isUser = false
      sessionStorage.getItem("roleType") === 'admin' ? this.isAdmin = true : this.isAdmin = false
    },
    updateUserAndReload: function () {
      this.updateUserAccess()
      this.$router.push({name: 'homeRoute'})
      // this.$router.go()
    },
    getAllLocations: function () {
      this.$http.get("/waterbodies")
          .then(response => {
            this.locations = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },

    getSpecies: function () {
      this.$http.get("/fish/species")
          .then(response => {
            this.species = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },

    checkIfFishview: function () {
      console.log('check if fish meetod')

      if (this.$route.name === 'homeRoute' || this.$route.name === 'userFishRoute') {
        this.isHomeView = true
      } else {
        this.isHomeView = false
      }
    }
  },
  beforeMount() {
    this.updateUserAccess()
    this.getAllLocations()
    this.getSpecies()
    this.checkIfFishview()

  },
  watch: {
    $route() {
      console.log('route algus')
      this.checkIfFishview()
      console.log('route peale meetodit')

    }
  }

}
</script>

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


