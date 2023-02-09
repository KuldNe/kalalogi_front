import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import FishView from "@/views/FishView.vue";
import CatchesView from "@/views/CatchesView.vue";

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
  }
]

const router = new VueRouter({
  routes
})

export default router
