<template>
  <div>
  <AlertDanger :message="message" />
  <div id="login">

    <div class="col-4">
      <form class="px-4 py-3">
        <div class="mb-3">
          <label class="form-label">Kasutajanimi</label>
          <input v-model="username" type="text" class="form-control" placeholder="kasutajanimi">
        </div>
        <div class="mb-3">
          <label class="form-label">Parool</label>
          <input v-model="password" type="password" class="form-control" placeholder="parool">
        </div>
        <button v-on:click="login" type="submit" class="btn btn-primary">Logi sisse</button>
      </form>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" href="#">New around here? Sign up</a>
    </div>
  </div>

  </div>
</template>

<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";
export default {
  name: "LoginView",
  components: {AlertDanger},

  data: function () {
    return {
      loginResponse: {
        userId: 0,
        roleType: ''
      },

      apiError: {
        message: '',
        errorCode: ''
      },

      message: '',

      username: '',
      password: ''
    }
  },

  methods: {

    login: function () {
      this.message = ''
      if (this.username == '' || this.password =='') {
        this.message = 'täida kõik väljad'
      } else {
        this.sendLoginRequest();
      }

    },

    sendLoginRequest: function () {
      this.$http.get("/login", {
            params: {
              username: this.username,
              password: this.password
            }
          }
      ).then(response => {
        this.loginResponse = response.data
        sessionStorage.setItem('userId', this.loginResponse.userId)
        sessionStorage.setItem('roleType', this.loginResponse.roleType)
        localStorage.setItem('lang', 'EST')
        this.$emit('emitLoginSuccessEvent')
        this.$router.push({name: 'atmsRoute'})
      }).catch(error => {
        this.apiError = error.response.data
        this.message = this.apiError.message
      })
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
</style>