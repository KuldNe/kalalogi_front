import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import FishView from "@/views/FishView.vue";
import CatchesView from "@/views/CatchesView.vue";
import UserFishView from "@/views/UserFishView.vue";
import TestView from "@/views/TestView.vue";
import ChartView from "@/views/ChartView.vue";

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
    path: '/testview',
    name: 'testRoute',
    component: TestView
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
    path: '/chart',
    name: 'chartRoute',
    component: ChartView
  },

]

const router = new VueRouter({
  routes
})

export default router
