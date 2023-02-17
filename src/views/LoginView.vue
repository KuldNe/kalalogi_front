<template>

  <div id="view" v-on:keydown.enter="login" class="col-4 bg-dark just rounded-4" style="margin-top: 100px; margin-left: 30px; padding: 30px">

      <AlertDanger :message="messageDanger" />

        <div class="mb-3">
          <label class="form-label">Kasutajanimi</label>
          <input v-model="username" type="text" class="form-control" placeholder="kasutajanimi">
        </div>
        <div class="mb-3">
          <label class="form-label">Parool</label>
          <input v-model="password" type="password" class="form-control" placeholder="parool">
        </div>
        <button v-on:click="login" type="submit" class="btn btn-secondary">Logi sisse</button>


<router-link to="/register">Oled uus? Registreeru!</router-link>


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
        userName: '',
        roleType: ''
      },

      apiError: {
        message: '',
        errorCode: ''
      },

      messageDanger: '',

      username: '',
      password: '',
    }
  },

  methods: {

    login: function () {
      this.messageDanger = ''
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
        sessionStorage.setItem('userName', this.loginResponse.userName)
        sessionStorage.setItem('roleType', this.loginResponse.roleType)

        localStorage.setItem('lang', 'EST')
        this.$emit('emitLoginSuccessEvent')
      }).catch(error => {
        this.apiError = error.response.data
        this.messageDanger = this.apiError.message
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