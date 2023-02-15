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
      <div v-if="showEdit">
        KARTUL

      </div>


    </div>
  </div>
</template>
<script>
export default {
  name: 'CatchDetails',
  props: {
    aCatch: {}
  },

  data: function () {
    return {
      showEdit: false,
    }
  },

  methods: {
    toggleShowEdit: function () {
      this.showEdit = !this.showEdit
    }
  }


}
</script>