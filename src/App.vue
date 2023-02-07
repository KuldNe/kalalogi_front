<!--<template>-->
<!--  <div id="app">-->
<!--    <nav>-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </nav>-->

    //
    <template>

      <div class="sidebar d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <svg class="bi me-2" width="0" height="32"><use xlink:href="#bootstrap"></use></svg>


          <img src="https://i.fbcd.co/products/original/4dd08023a2500a7efaf141af098d33ad7832bd3f45350ff0df4a4e317a62ce83.jpg" alt="" width="50" height="50" class="rounded-circle me-1" >
          <span class=" text-white fs-4">Kalalogi</span>
        </a>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <a href="#" class="nav-link active" aria-current="page">
              <svg class="bi me-2" width="16" height="16"><use xlink:href="#püügiandmed"></use></svg>
              Püügiandmed
            </a>
          </li>
          <li>
            <a href="#" class="nav-link link-dark">
              <svg class="bi me-2" width="16" height="16" ><use xlink:href="#speedometer2"></use></svg>
              Logi sisse/registreeru
            </a>
          </li>
        </ul>
        <hr>
        <div class="dropdown"> Filtreeri
          <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">

          </a>
          <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
            <li><a class="dropdown-item" href="#">Kuupäev</a></li>
            <li><a class="dropdown-item" href="#">Püügikoht</a></li>
            <li><a class="dropdown-item" href="#">Kalaliik</a></li>
          </ul>
        </div>
      </div>

    </template>


    //
    <router-view/>
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

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

