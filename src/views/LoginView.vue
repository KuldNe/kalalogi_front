<template>

  <div id="view" class="col-4 bg-dark just rounded-4" style="margin-top: 100px; margin-left: 30px; padding: 30px">

      <AlertDanger :message="message" />
      <form class="px-4 py-3">
        <div class="mb-3">
          <label class="form-label">Kasutajanimi</label>
          <input v-model="username" type="text" class="form-control" placeholder="kasutajanimi">
        </div>
        <div class="mb-3">
          <label class="form-label">Parool</label>
          <input v-model="password" type="password" class="form-control" placeholder="parool">
        </div>
        <button v-on:click="login" type="submit" class="btn btn-secondary">Logi sisse</button>
      </form>

<router-link to="/register">Oled uus? Registreeru!</router-link>
<!--      <a class="btn btn-secondary btn-sm" href="/#/register" role="button">Oled uus? Registreeru!</a>-->


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
        // this.message = 'Täida kõik väljad'
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

div {
}

#view {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
</style>