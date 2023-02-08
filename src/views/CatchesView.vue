<template>
 <div>
  <div class="container m-3 p-3 ">
    <div class="align-items-center row text-white bg-dark">
      <div class="col-2">
        <span>Kuupäev</span>
        <input id="startDate" class="form-control" type="date" />
      </div>

      <div class="col-5">
        <span>Püügikoht</span>
        <select v-model="locationId" class="form-select" aria-label="Default select example">
          <option v-for="location in locations" :value="location.locationId">{{ location.locationName }}</option>
        </select>
      </div>
      <div class="col">
        <span>Lisa püük                </span>
        <font-awesome-icon class="fa-2xl" icon="fa-regular fa-square-check" />
      </div>
    </div>
  </div>

   <div class="container m-3 p-3">
     <div class="align-items-center row text-white bg-dark">
       <div class="col-2">
         <span>Kuupäev:     </span>
         <span>Date</span>
       </div>

       <div class="col-5">
         <span>Püügikoht:    </span>
         <span>Mingi järv</span>
       </div>
       <div class="col-2">
         <span>Muuda      </span>
         <font-awesome-icon class="fa-2xl" icon="fa-regular fa-pen-to-square" />
       </div>
       <div class="col-2">
         <span>Lisa kala      </span>
         <router-link to="/fish"> <font-awesome-icon class="fa-2xl" icon="fa-regular fa-square-plus"/> </router-link>
       </div>
     </div>
   </div>

 </div>
</template>

<script>


export default {
  name: "CatchesView",
  data: {

  }
}

</script>

