<template>
  <div>
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
        <select v-model="editLocationId" class="form-select" aria-label="catchi püügikoht">
          <option v-for="location in locations" :value="location.locationId">{{ location.locationName }}</option>
        </select>
      </div>

      <div class="col-2">
        <button v-on:click="checkAndEditCatch" type="button" class="btn btn-light" style="margin-top: 21px">Salvesta
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EditCatch',
  props: {
    showEdit: {},
    aCatch: {},
    locations: []
  },

  data: function () {
    return {
      editDate: '',
      editLocationId: '',
      messageDanger: '',
      messageSuccess: '',
    }
  },

  methods: {
    checkAndEditCatch: function () {
      if (this.editDate !== '' && this.editLocationId !== 0) {
        this.editCatch()
      } else {
        this.messageDanger = 'Täida kõik väljad'
      }
    },

    editCatch: function () {
      this.$http.put("/catch",
          {
            date: this.editDate,
            userId: sessionStorage.getItem("userId"),
            waterbodyId: this.editLocationId
          },
          {
            params: {
              catchId: this.aCatch.catchId
            }
          }
      ).then(response => {
        this.toggleShowEdit()
        this.$emit('emitCatchUpdateSuccess')
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