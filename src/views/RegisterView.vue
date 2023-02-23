<template>

  <div id="view" class="col-4 bg-dark just rounded-4" style="margin-top: 100px; margin-left: 30px; padding: 30px">

    <AlertDanger :message="messageDanger"/>
    <div class="px-4 py-3" v-on:keydown.enter="validateAndRegister">
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
        <input v-model="password" type="password" class="form-control" placeholder="parool">
      </div>
      <div class="mb-3">
        <label class="form-label">Kinnita parool:</label>
        <input v-model="confirmpassword" type="password" class="form-control" placeholder="kinnita parool">
      </div>
      <button v-on:click="validateAndRegister" type="submit" class="btn btn-secondary">Loo kasutaja</button>
    </div>

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
      messageDanger: '',

      username: '',
      email: '',
      password: '',
      confirmpassword: ''
    }
  },

  methods: {

    validateAndRegister: function () {
      this.messageDanger = ''
      if (this.username === '' || this.email === '' || this.password === '' || this.confirmpassword === '') {
        this.messageDanger = 'Täida kõik väljad'
      } else if (this.password !== this.confirmpassword) {
        this.messageDanger = 'Parool ja kinnitusparool ei kattu'
      } else {
        this.sendRegisterRequest();
      }
    },

    sendRegisterRequest: function () {
      this.$http.post("/register", {
        username: this.username,
        email: this.email,
        password: this.password
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

<style scoped>

</style>