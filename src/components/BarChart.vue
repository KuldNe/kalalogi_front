<template>
  <div class="align-content-center">

  <div class="col-6" style="margin-top: 8px; margin-left: 8px; padding: 8px">
    <Bar v-if="chartLoaded"  class="bg-light align-content-center "
         id="my-chart-id"
         :options="chartOptions"
         :data="chartData"
    />
  </div>

  </div>


</template>

<script>

import {Bar} from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "BarChart",
  components: {Bar},

  data() {
    return {
      chartLoaded: false,
      userId: sessionStorage.getItem('userId'),
      chartData: {
        datasets: [
          {
            label: '',
            data: [  {
              speciesName: "string",
              countFish: 15
            }
            ]
          },
        ],
      },
      chartOptions: {
        responsive: true,
        backgroundColor: '#3290c9',
        hoverBackgroundColor: '#79b7e0',
        borderWidth: 1,
        borderColor: '#27272a',

        parsing: {
          xAxisKey: 'speciesName',
          yAxisKey: 'countFish'
        }

      },

    }
  },

  methods: {

    getBarChartFish: function () {
      this.$http.get("/barchart", {
            params: {
              userId: this.userId,
            }
          }
      ).then(response => {
        this.chartData.datasets[0].data = response.data
        this.chartData.datasets[0].label = 'Kasutaja ' + sessionStorage.getItem('userName') + ' kalad'
        this.chartLoaded = true

      }).catch(error => {
        console.log(error)
      })
    },

  },

  beforeMount() {
    this.getBarChartFish()
  }


}
</script>
