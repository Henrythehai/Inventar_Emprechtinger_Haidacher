import { createRouter, createWebHistory } from 'vue-router'
import DevicesView from '@/views/DevicesView.vue'
import DeviceFormView from '@/views/DeviceFormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // each route maps a URL to a view component
  routes: [
    { path: '/', component: DevicesView },
    { path: '/devices/new', component: DeviceFormView },
    // :id is a route parameter, e.g. /devices/3/edit -> id = "3"
    { path: '/devices/:id/edit', component: DeviceFormView },
  ],
})

export default router
