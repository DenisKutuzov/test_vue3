
import { createRouter, createWebHistory } from 'vue-router'
export const routes = [

  {
    path: '/',
    name: 'CarPark',
    component: () => import(/* webpackChunkName: "carPark"  */ '@/views/carPark/CarParkView.vue'),
    meta: {
      id: '6',
      title: 'Автопарк',
      icon: ['fas', 'taxi'],
      layout: 'main-layout'
    },
    children: []
  }

]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
