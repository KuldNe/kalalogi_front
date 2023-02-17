<template>
  <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      userChartFishes: [
        {
          count: 0,
          speciesName:'',
          acatchWaterbodyName: '',
        }
      ],
      userId: sessionStorage.getItem('userId'),

      chartData: {
        labels: ["Juuni", "Juuli", "August", "September"],
        datasets: [ { label: "Püütud kalade arv", data: [40, 20, 12, 11] } ]
      },
      chartOptions: {
        responsive: true
      }
    }

  },

  methods: {
    getUserFish: function () {
      this.$http.get("/user/chart", {
            params: {
              userId: this.userId
            }
          }
      ).then(response => {
        this.userChartFishes = response.data
      }).catch(error => {
        console.log(error)
      })
    },
  }

}
</script>

