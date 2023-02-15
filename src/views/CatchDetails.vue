<template>
  <div class="container m-3 p-3">
    <div class="align-items-center row text-white bg-dark"
         style="margin-top: 10px; margin-left: 10px; padding: 15px">
      <div class="col-2">
        <span>Kuupäev: {{ aCatch.catchDate }}</span>
      </div>

      <div class="col-4">
        <span>Püügikoht: {{ aCatch.waterbodyName }}</span>
      </div>
      <div class="col-2">
        <span>Muuda      </span>
        <font-awesome-icon v-on:click="toggleShowEdit" class="fa-2xl" icon="fa-regular fa-pen-to-square"/>
      </div>
      <div class="col-2">
        <span>Vaata kalu      </span>
        <font-awesome-icon class="fa-2xl" icon="fa-solid fa-fish-fins" />

      </div>

      <div class="col-2">
        <span>Lisa kala      </span>
        <router-link :to="{name: 'fishRoute', query: {catchId: aCatch.catchId}}">
          <font-awesome-icon class="fa-2xl" icon="fa-regular fa-square-plus"/>
        </router-link>
      </div>
      <AlertDanger :message="messageDanger"/>
      <AlertSuccess :message="messageSuccess"/>

      <EditCatch :check-and-edit-catch="checkAndEditCatch" :edit-date="editDate" :edit-location-id="editLocationId"
                    :locations="locations" :show-edit="showEdit"/>

    </div>
  </div>
</template>
<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import EditCatch from "@/components/EditCatch.vue";

export default {
  name: 'CatchDetails',
  components: {EditCatch, AlertSuccess, AlertDanger},
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


    checkAndEditCatch: function () {
      if (this.editDate !== '' && this.editLocationId !== 0) {
        this.editCatch()
      } else {
        this.messageDanger = 'Tee paremini!'
      }
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
        this.toggleShowEdit()
        this.$router.go()
      }).catch(error => {
        console.log(error)
      })
    },

    prefillEditCatch: function () {
      this.editDate = this.aCatch.catchDate
      this.editLocationId = this.aCatch.waterbodyId
    },

  },

  beforeMount() {
    this.prefillEditCatch()
  }

}
</script>