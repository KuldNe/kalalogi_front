<template>
  <div aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" v-if="pageNo>1" v-on:click="pageChange(pageNo-1)">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <div v-for="page in totalPages" :key="page">
        <li class="page-item"><a class="page-link" v-on:click="pageChange(page)">{{ page }}</a></li>
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
  
  data: function () {
    return {
      changedPage: Number
    }
  },
  methods: {
    pageChange: function (NewPageNo) {
      this.$parent.setPageNo(NewPageNo)
    }
    
  }
}
</script>