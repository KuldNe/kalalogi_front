<template>

  <div id="view" class="col-4 bg-dark just rounded-4" style="margin-top: 100px; margin-left: 30px; padding: 30px">

    <AlertDanger :message="message" />
    <form class="px-4 py-3">
      <select v-model="fishId" class="form-select" aria-label="Default select example">
        <option v-for="fish in fishes" :value="fish.fishId">{{ fish.name }}</option>
      </select>

      <div>
        <div class="input-group mb-3 col-2">
          <span class="input-group-text">pikkus</span>
          <input v-model="length" type="number" class="form-control">
          <span class="input-group-text">cm</span>
        </div>
        <div class="input-group mb-3 col-2">
          <span class="input-group-text">kaal</span>
          <input v-model="length" type="number" class="form-control">
          <span class="input-group-text">kg</span>
        </div>

        <select v-model="locationId" class="form-select" aria-label="Default select example">
          <option selected >Püügikoht</option>
          <option v-for="location in locations" :value="location.locationId">{{ location.locationName }}</option>
        </select>


        <div class="form-floating">
          <textarea class="form-control" placeholder="Kommentaarid" id="floatingTextarea"></textarea>
          <label for="floatingTextarea">Comments</label>
        </div>

          <div class="form-check">
            <input v-model="released" class="form-check-input" type="checkbox">
            <label class="form-check-label">
              Vabastatud
            </label>
          </div>

      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "FishView",

  data: function () {
    return {
      fishes: [
        {
          fishId: 0,
          fishName: '',
        }
      ],
      locations: [
        {
          locationId: 0,
          locationName: ''
        }
      ],

      fishId: 0,
      length: 0,
      weight: 0,
      locationId: 0,
      message: '',
      released: false


    }


  }
}
</script>

<style scoped>

</style>