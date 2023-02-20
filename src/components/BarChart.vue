<template>
  <div>
    <span>Hello</span>
    <br>
    <span>{{ numberOfFish }}</span>

    <Bar class="bg-light align-content-center "
         id="my-chart-id"
         :options="chartOptions"
         :data="chartData"
    />

    <div id="example_1">
      <ul>
        <li v-if="chartFishes.length">Array Length : {{ chartFishes.length }}</li>
        <li v-for="name in chartFishes">
          Category : {{ name.speciesName }}
        </li>
      </ul>
      <div/>


    </div>

  </div>


</template>

<script>

import {Bar} from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'
import data from "bootstrap/js/src/dom/data";


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "BarChart",
  components: {Bar},

  data() {
    return {

      chartFishes: [
        {
          fishId: 0,
          speciesName: '',
          length: 0,
          weight: 0,
          date: '',
          locationName: '',
          released: true,
          isPublic: true,
          comment: '',
          userName: '',
          picture: ''
        }
      ],
      userId: sessionStorage.getItem('userId'),

      numberOfFish: 0,
      parsedChart: [],

      chartData: {

        datasets: [
          {
            label: '',
            data: [{id: 'whatevr', nested: {value: 1111}}, {id: 'Kalaliik 2', nested: {value: 500}}]
          },
        ],
      },
      chartOptions: {
        responsive: true,
        backgroundColor: '#0037ff',
        parsing: {
          xAxisKey: 'id',
          yAxisKey: 'nested.value'
        }

      },


    }
  },


  methods: {


    getChartFish: function () {
      this.$http.get("/barchart", {
            params: {
              userId: this.userId,
            }
          }
      ).then(response => {
        this.chartFishes = response.data
        this.numberOfFish = this.$data.chartFishes.length
        this.chartData.datasets[0].label = 'proov'
        this.chartFishes = JSON.parse(this.chartFishes)

      }).catch(error => {
        console.log(error)
      })
    },
  },

  beforeMount() {
    this.getChartFish()
  }


}
</script>
