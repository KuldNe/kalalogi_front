<template>
  <div @mouseover="showButtons=true" @mouseout="showButtons=false">
    <div class="align-items-center row text-white bg-dark"
         style="margin-top: 10px; margin-left: 10px; padding: 15px">
      <div class="col-2">
        <span>Kuupäev: {{ aCatch.catchDate }}</span>
      </div>

      <div class="col-2">
        <span>Püügikoht: {{ aCatch.waterbodyName }}</span>
      </div>

      <div v-show="showButtons" class="col-2">
        <span>Muuda      </span>
        <font-awesome-icon v-on:click="toggleShowEdit" class="fa-2xl icon-button" icon="fa-regular fa-pen-to-square"/>
      </div>
      <div v-show="showButtons" class ="col-2">
        <span>Kustuta    </span>
        <font-awesome-icon v-on:click="askDeleteCatch" class="fa-2xl icon-button" icon="fa-regular fa-trash-can" style="color:crimson" />
      </div>
      <div v-show="showButtons" class="col-2">
        <span>Vaata saaki</span>
        <router-link :to="{name: 'userFishRoute', query: {catchId: aCatch.catchId}}">
        <font-awesome-icon class="fa-2xl" icon="fa-solid fa-fish-fins" />
        </router-link>
      </div>
      <div v-show="showButtons" class="col-2">
        <span>Lisa kala      </span>
        <router-link :to="{name: 'fishRoute', query: {catchId: aCatch.catchId}}">
          <font-awesome-icon class="fa-2xl" icon="fa-regular fa-square-plus"/>
        </router-link>
      </div>
      <AlertDanger :message="messageDanger"/>
      <AlertSuccess :message="messageSuccess"/>
      <EditCatch :locations="locations" :show-edit="showEdit" :a-catch="aCatch" @emitCatchUpdateSuccess="toggleShowEdit"/>

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
      showButtons: false,

      // editDate: '',
      // editLocationId: '',
      messageDanger: '',
      messageSuccess: '',
    }
  },

  methods: {
    toggleShowEdit: function () {
      this.showEdit = !this.showEdit
      this.$emit('emitCatchUpdateSuccess')
    },

    // checkAndEditCatch: function () {
    //   if (this.editDate !== '' && this.editLocationId !== 0) {
    //     this.editCatch()
    //   } else {
    //     this.messageDanger= 'Täida kõik väljad'
    //   }
    // },
    //
    // editCatch: function () {
    //   this.$http.put("/catch",
    //       {
    //         date: this.editDate,
    //         userId: sessionStorage.getItem("userId"),
    //         waterbodyId: this.editLocationId
    //       },
    //       {
    //         params: {
    //           catchId: this.aCatch.catchId
    //         }
    //       }
    //   ).then(response => {
    //     this.toggleShowEdit()
    //     this.$emit('emitCatchUpdateSuccess')
    //   }).catch(error => {
    //     console.log(error)
    //   })
    // },
    //
    // prefillEditCatch: function () {
    //   this.editDate = this.aCatch.catchDate
    //   this.editLocationId = this.aCatch.waterbodyId
    // },

    askDeleteCatch: function () {
      if(confirm('Oled sa kindel, et soovid püüki kustutada?')) {
        this.deleteCatch()
      } else {

      }
    },

    deleteCatch: function () {
      this.$http.delete("/catch", {
            params: {
              catchId: this.aCatch.catchId
            }
          }
      ).then(response => {
        this.messageSuccess= 'Püük kustutatud!'
        setTimeout(() => {
          // this.$router.go()
          this.$emit('emitCatchUpdateSuccess')
        }, 2000)
      }).catch(error => {
        console.log(error)
      })
    },


  },

  beforeMount() {
    // this.prefillEditCatch()
  }


}
</script>