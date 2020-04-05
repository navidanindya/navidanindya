import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from "vue-meta";
import Home from '../views/Home.vue'

Vue.use(VueRouter)
Vue.use(VueMeta)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    // catch all 404 - define at the very end
    path: "*",
    component: () =>
      import(/* webpackChunkName: "error" */ "../views/Error.vue"),
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
