<template>
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
</template>
<script>
export default {
  name: 'EditCatch',
  props: {
    checkAndEditCatch: {},
    editDate: {},
    editLocationId: {},
    locations: {},
    showEdit: {}
  }
}
</script>