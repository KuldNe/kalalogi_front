<template>
  <div aria-label="Page navigation example">
    <ul class="pagination">

      <li class="page-item" v-if="pageNo>1" v-on:click="pageChange(pageNo-1)">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <div v-for="page in range(firstButtonNo, lastButtonNo)" :key="page">
        <li class="page-item icon-button" :class="{active : page===pageNo }"><a class="page-link" v-on:click="pageChange(page)">{{ page }}</a></li>
      </div>

      <li class="page-item" v-if="pageNo<totalPages" v-on:click="pageChange(pageNo+1)">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>

    </ul>
  </div>
</template>
<script>
export default {
  name: 'Paginator',
  props: {
    totalPages: {},
    pageNo: {}
  },
  watch: {
    pageNo() {
      this.createPaginatorButtonValues(this.totalPages, this.pageNo)
    },
    totalPages() {
      this.createPaginatorButtonValues(this.totalPages, this.pageNo)
    }
  },
  
  data: function () {
    return {
      changedPage: Number,
      firstButtonNo: '',
      lastButtonNo: ''
    }
  },

  methods: {
    pageChange: function (newPageNo) {
      this.$parent.setPageNo(newPageNo)
    },
    createPaginatorButtonValues: function (totalPages, pageNo) {
      let window = 5
      let start = pageNo - window
      let end = pageNo + window - 1
      if (start <= 0) {
        end = end - start + 1
        start = 1
      }
      if (end > totalPages) {
        end = totalPages
        start = Math.max(end-(window * 2) + 1, 1)
      }
      this.firstButtonNo = start
      this.lastButtonNo = end
    },

    range: function(min,max){
      let array = [],
          j = 0;
      for(let i = min; i <= max; i++){
        array[j] = i;
        j++;
      }
      return array;
    }
  },

  beforeMount() {
    this.createPaginatorButtonValues(this.totalPages, this.pageNo)
  }
}
</script>