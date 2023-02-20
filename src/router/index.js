import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import FishView from "@/views/FishView.vue";
import CatchesView from "@/views/CatchesView.vue";
import UserFishView from "@/views/UserFishView.vue";
import BarChartView from "@/components/BarChart.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homeRoute',
    component: HomeView
  },
  {
    path: '/login',
    name: 'loginRoute',
    component: LoginView
  },
  {
    path: '/userfish',
    name: 'userFishRoute',
    component: UserFishView
  },

  {
    path: '/catches',
    name: 'catchesRoute',
    component: CatchesView
  },
  {
    path: '/fish',
    name: 'fishRoute',
    component: FishView
  },
  {
    path: '/register',
    name: 'registerRoute',
    component: RegisterView
  },
  {
    path: '/barchart',
    name: 'barChartRoute',
    component: BarChartView
  }
]

const router = new VueRouter({
  routes
})

export default router
