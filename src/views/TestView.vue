<template>
  <div id="app">
    <div class="">
      <div v-for="(src, index) in imgs" :key="index" class="pictures" @click="() => showImg(index)">
        <img class="img-thumbnail" :src="src.src" />
      </div>
    </div>
    <vue-easy-lightbox
        :visible="visible"
        :imgs="imgs"
        :index="index"
        @hide="handleHide"
    ></vue-easy-lightbox>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      visible: false,
      index: 0, // default: 0
      imgs: [
        {
          src:
              "https://vcdn-vnexpress.vnecdn.net/2021/11/04/251847737-3868210133437093-7517-1635998498.jpg",
          title: "Ảnh con vịt dẹpd",
        }
      ],
    };
  },
  methods: {
    showImg(index) {
      this.index = index;
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.pictures {
  display: flex;
}
</style>

