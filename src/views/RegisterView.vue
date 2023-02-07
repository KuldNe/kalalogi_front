<template>

  <div id="view" class="col-4 bg-dark just rounded-4" style="margin-top: 100px; margin-left: 30px; padding: 30px">

    <AlertDanger :message="message"/>
    <form class="px-4 py-3">
      <div class="mb-3">
        <label class="form-label">Kasutajanimi:</label>
        <input v-model="username" type="text" class="form-control" placeholder="kasutajanimi">
      </div>
      <div class="mb-3">
        <label class="form-label">E-mail:</label>
        <input v-model="email" type="text" class="form-control" placeholder="email">
      </div>
      <div class="mb-3">
        <label class="form-label">Parool:</label>
        <input v-model="password" type="text" class="form-control" placeholder="parool">
      </div>
      <div class="mb-3">
        <label class="form-label">Kinnita parool:</label>
        <input v-model="confirmpassword" type="password" class="form-control" placeholder="kinnita parool">
      </div>
      <button type="submit" class="btn btn-secondary">Loo kasutaja</button>
    </form>

  </div>
</template>

<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: "RegisterView",
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
      email: '',
      password: '',
      confirmpassword: ''
    }
  },

  methods: {

    register: function () {
      this.message = ''
      if (this.username == '' || this.password =='') {
        this.message = 'täida kõik väljad'
      } else {
        this.sendLoginRequest();
      }

    },

    sendLoginRequest: function () {
      this.$http.get("/register", {
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

<style scoped>

</style>