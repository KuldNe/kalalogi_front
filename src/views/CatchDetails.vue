<template>
  <div class="container m-3 p-3">
    <div class="align-items-center row text-white bg-dark"
         style="margin-top: 10px; margin-left: 10px; padding: 15px">
      <div class="col-2">
        <span>Kuupäev: {{ aCatch.catchDate }}</span>
      </div>

      <div class="col-5">
        <span>Püügikoht: {{ aCatch.waterbodyName }}</span>
      </div>
      <div class="col-2">
        <span>Muuda      </span>
        <font-awesome-icon v-on:click="toggleShowEdit" class="fa-2xl" icon="fa-regular fa-pen-to-square"/>
      </div>
      <div class="col-2">
        <span>Lisa kala      </span>
        <router-link :to="{name: 'fishRoute', query: {catchId: aCatch.catchId}}">
          <font-awesome-icon class="fa-2xl" icon="fa-regular fa-square-plus"/>
        </router-link>
      </div>
      <AlertDanger :message="messageDanger"/>
      <AlertSuccess :message="messageSuccess"/>

      <div v-if="showEdit" class="align-items-center row text-white bg-dark"
           style="margin-top: 10px; margin-left: 10px; padding: 10px">
        <div class="col-2">
          <span>Kuupäev</span>
          <input v-model="editDate" id="startDate" class="form-control" type="date"/>
        </div>

        <div class="col-5">
          <span>Püügikoht</span>
          <select v-model="editLocationId" class="form-select" aria-label="Default select example">
            <option v-for="location in locations" :value="location.locationId">{{ location.locationName }}</option>
          </select>
        </div>

        <div class="col-2">
          <button v-on:click="editCatch" type="button" class="btn btn-light" style="margin-top: 21px">Salvesta</button>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: 'CatchDetails',
  components: {AlertSuccess, AlertDanger},
  props: {
    aCatch: {},
    locations: []
  },
  data: function () {
    return {
      showEdit: false,
      editDate: '',
      editLocationId: 0,
      messageDanger: '',
      messageSuccess: '',
    }
  },

  methods: {
    toggleShowEdit: function () {
      this.showEdit = !this.showEdit
    },

    editCatch: function () {
      this.$http.put("/catch",
          {
            date: this.editDate,
            userId: sessionStorage.getItem('userId'),
            waterbodyId: this.editLocationId
          },
          {
            params: {
              catchId: this.aCatch.catchId,
            }
          }
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
  }
}
</script>